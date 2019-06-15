/*
*  Simple navigation control that allows back and forward navigation through map's view history
*/

(function () {
    L.Control.NavBar = L.Control.extend({
        options: {
            tileBaseUrl: '',
            position: 'topleft',
            //center:,
            //zoom :,
            forwardTitle: "رفتن به جلو",
            backTitle: "برگشت به عقب",
            homeTitle: "حالت اولیه",
            changeTileTitle: "تغییر زمینه",
          //  identofyTitle:"شناسایی"
        },

        onAdd: function (map) {

            // Set options
            if (!this.options.center) {
                this.options.center = map.getCenter();
            }
            if (!this.options.zoom) {
                this.options.zoom = map.getZoom();
            }
            options = this.options;

            // Create toolbar
            var controlName = 'leaflet-control-navbar',
            container = L.DomUtil.create('div', controlName + ' leaflet-bar');

            // Add toolbar buttons
            this._homeButton = this._createButton(options.homeTitle, controlName + '-home', container, this._goHome);
            this._fwdButton = this._createButton(options.forwardTitle, controlName + '-fwd', container, this._goFwd);
            this._backButton = this._createButton(options.backTitle, controlName + '-back', container, this._goBack);
            this._tileButton = this._createButton(options.changeTileTitle, controlName + '-tile', container, this._changetile);
           // this._IdenButton = this._createButton(options.identofyTitle, controlName + '-identify', container, function () { });
            // Initialize view history and index
            this._viewHistory = [{ center: this.options.center, zoom: this.options.zoom }];
            this._curIndx = 0;
            this._updateDisabled();
            map.once('moveend', function () { this._map.on('moveend', this._updateHistory, this); }, this);
            // Set intial view to home
            map.setView(options.center, options.zoom);

            return container;
        },

        onRemove: function (map) {
            this._map.off('moveend', this._updateHistory, this);
        },

        _goHome: function () {
            this._map.setView(this.options.center, this.options.zoom);
        },

        _goBack: function () {
            if (this._curIndx != 0) {
                this._map.off('moveend', this._updateHistory, this);
                this._map.once('moveend', function () { this._map.on('moveend', this._updateHistory, this); }, this);
                this._curIndx--;
                this._updateDisabled();
                var view = this._viewHistory[this._curIndx];
                this._map.setView(view.center, view.zoom);

                console.log(this._curIndx + "|" + JSON.stringify(this._viewHistory));
            }
        },

        _goFwd: function () {
            if (this._curIndx != this._viewHistory.length - 1) {
                this._map.off('moveend', this._updateHistory, this);
                this._map.once('moveend', function () { this._map.on('moveend', this._updateHistory, this); }, this);
                this._curIndx++;
                this._updateDisabled();
                var view = this._viewHistory[this._curIndx];
                this._map.setView(view.center, view.zoom);

                console.log(this._curIndx + "|" + JSON.stringify(this._viewHistory));
            }
        },

        _changetile: function () {
            var baseTileUrl = this.options.tileBaseUrl;
            var mymap = this._map;
            var tileLayerkey;

            var alllayer = mymap._layers;
            var i = 1; for (var key in mymap._layers) {
                console.log(i); i = i + 1; console.log(key);


                var baseUrl = mymap._layers[key]._url;
                if (baseUrl != undefined && baseUrl != null && (baseUrl != "" || baseUrl != '') && (baseUrl.indexOf("tiles") != -1))
                {

                    tileLayerkey = key;

                }


            }

             //debugger;
            var url = mymap._layers[tileLayerkey]._url;
            if (url == baseTileUrl + 'google.hybrid/{z}/{x}/{y}') {
                mymap._layers[tileLayerkey]._url = baseTileUrl + 'google.map/{z}/{x}/{y}'
            }
            if (url == baseTileUrl + 'google.map/{z}/{x}/{y}')
            {
                mymap._layers[tileLayerkey]._url = baseTileUrl + 'openstreetmap/{z}/{x}/{y}'
            }
            if (url == baseTileUrl + 'openstreetmap/{z}/{x}/{y}')
            {
                mymap._layers[tileLayerkey]._url = baseTileUrl + 'google.hybrid/{z}/{x}/{y}'
            }
          
            mymap._layers[tileLayerkey].redraw()
            console.log('yrl is = ' + url);
        },
  

        _createButton: function (title, className, container, fn) {
            // Modified from Leaflet zoom control

            var link = L.DomUtil.create('a', className, container);
            link.href = '#';
            link.title = title;

            L.DomEvent
            .on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.stop)
            .on(link, 'click', fn, this)
            .on(link, 'click', this._refocusOnMap, this);

            return link;
        },

        _updateHistory: function (e) {
            var newView = { center: this._map.getCenter(), zoom: this._map.getZoom() };
            var curView = this._viewHistory[this._curIndx];
            var insertIndx = this._curIndx + 1;
            this._viewHistory.splice(insertIndx, this._viewHistory.length - insertIndx, newView);
            this._curIndx++;
            // Update disabled state of toolbar buttons
            this._updateDisabled();

            console.log(this._curIndx + "|" + JSON.stringify(this._viewHistory));
        },

        _setFwdEnabled: function (enabled) {
            var leafletDisabled = 'leaflet-disabled';
            var fwdDisabled = 'leaflet-control-navbar-fwd-disabled';
            if (enabled === true) {
                L.DomUtil.removeClass(this._fwdButton, fwdDisabled);
                L.DomUtil.removeClass(this._fwdButton, leafletDisabled);
            } else {
                L.DomUtil.addClass(this._fwdButton, fwdDisabled);
                L.DomUtil.addClass(this._fwdButton, leafletDisabled);
            }
        },

        _setBackEnabled: function (enabled) {
            var leafletDisabled = 'leaflet-disabled';
            var backDisabled = 'leaflet-control-navbar-back-disabled';
            if (enabled === true) {
                L.DomUtil.removeClass(this._backButton, backDisabled);
                L.DomUtil.removeClass(this._backButton, leafletDisabled);
            } else {
                L.DomUtil.addClass(this._backButton, backDisabled);
                L.DomUtil.addClass(this._backButton, leafletDisabled);
            }
        },

        _updateDisabled: function () {
            if (this._curIndx == (this._viewHistory.length - 1)) {
                this._setFwdEnabled(false);
            } else {
                this._setFwdEnabled(true);
            }

            if (this._curIndx <= 0) {
                this._setBackEnabled(false);
            } else {
                this._setBackEnabled(true);
            }
        }

    });

    L.control.navbar = function (options) {
        return new L.Control.NavBar(options);
    };

})();
