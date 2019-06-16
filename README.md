# Asp.netCore2HelloWord
Hello Word Web Application-Multi language application

prerequisites

1-NET Core 2.2

2-visual studio 2017 15.9.3 or higher

3-AdventureWorks2012 database

-----------------------------------------------------

A tutorial project that contain 
1-HelloWordAsp.NetCore2 as  weblayer (asp.net core 2.2 ).

2-Helloworld.Business as Business layer  (.net standard 2  ).

3-DAL  as Data Layer (.net standard 2  ).

Use the StructureMap .

use  the  AdventureWorks2012  for DbFirst  contex  (Adventureworks2012Context)
and   MultiLayerCoreContext  as CodeFirst context.

--------------------------------------------
for implemeting and execute this project  add  below camamnds in the  Package Manager Console d uper 

1-Add-Migration firatmigration -context DAL.Model.MultiLayerCoreContext.

2-Update-Database -context DAL.Model.MultiLayerCoreContext.

because  i  have  2  context  along  side  in  DAL  , we must  declatre  context name in commands.
