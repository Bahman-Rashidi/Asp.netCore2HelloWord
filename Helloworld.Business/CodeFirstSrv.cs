using System;
using System.Collections.Generic;
using System.Text;
using DAL.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Helloworld.Business
{
    public class CodeFirstSrv : ICodFirstSrv
    {
        public bool addUser(User user)
        {
            bool isInsert = false;
            using (var db = new MultiLayerCoreContext())
            {
                try
                {

                    //var db2 = new DAL.Entites.Adventureworks2012Context();
                    //var dd = db2.Person.Select(x => x);


                    db.Users.Add(user);
                    db.SaveChanges();
                    isInsert = true;
                }

                catch (Exception ex)
                {
                    //log
                    isInsert = false;
                }

            }
            return isInsert;
        }

        public User[] GetUsers()
        {
            throw new NotImplementedException();
        }
    }
}
