using DAL.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Helloworld.Business
{
   public interface ICodFirstSrv
    {
        bool addUser(User user);

        User[] GetUsers();
    }
}
