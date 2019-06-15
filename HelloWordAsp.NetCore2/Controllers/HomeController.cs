using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HelloWordAsp.NetCore2.Models;
using Microsoft.Extensions.Options;
using Helloworld.Business.Utilities;

namespace HelloWordAsp.NetCore2.Controllers
{
    public class HomeController : Controller
    {
        private readonly IOptions<AppSettings> _appSettingsconfig;

        public HomeController(IOptions<AppSettings> appSettingsconfig)
        {
            _appSettingsconfig = appSettingsconfig;


        }


        public IActionResult Index()
        {


            var lat = _appSettingsconfig.Value.lat;
            var lng = _appSettingsconfig.Value.lng;


            ViewBag.lat = lat;
            ViewBag.lng = lng;
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
