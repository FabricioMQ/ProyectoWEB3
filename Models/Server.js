const express=require('express');
require('dotenv').config();
const ConectorMongo=require('../Database/Mongo');
const listEndpoints = require('express-list-endpoints');
const cors = require('cors');

class Server{
    constructor(){
       this.App=express();
       this.Port=process.env.PORT;
       this.LoginPath='/api/login'
       this.CitaPath='/api/cita'
       this.MiddleWares();
       this.Routes();
       this.MongoDB();

        
    }
    listen(){
        this.App.listen(this.Port,()=>{
            console.log(`El servidor esta corriendo en el puerto ${this.Port}`);
        });
    }
    
    
    Routes(){
        this.App.use(cors());
        this.App.use(this.LoginPath,require('../Routes/Login'));
        this.App.use(this.CitaPath,require('../Routes/Citas'));
        console.log(listEndpoints(this.App,{ extended: true ,prefix: 'https://proyectoweb3.up.railway.app/' }));
    }

    
    MiddleWares(){
        this.App.use(express.json());
    }
    
    MongoDB(){
        ConectorMongo();
    }
    
}    
    module.exports=Server;
   