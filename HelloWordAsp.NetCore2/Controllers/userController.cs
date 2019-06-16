using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Model;
using Helloworld.Business;
using Helloworld.Business.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace HelloWordAsp.NetCore2.Controllers
{
    public class userController : Controller
    {

        private ICodFirstSrv _codefirstSrv;

        private readonly IOptions<AppSettings> _appSettingsconfig;

        public userController(IOptions<AppSettings> appSettingsconfig, ICodFirstSrv codefirst)
        {
            _appSettingsconfig = appSettingsconfig;

            _codefirstSrv = codefirst;
        }
        public IActionResult Index()
        {
            return View();
        }

   
        public IActionResult AddUser()
        {

               return View();
        }
    
        [HttpPost]
        public IActionResult AddUser(User user)
        {
            
            _codefirstSrv.addUser(user);

            return View();
        }

    }
}