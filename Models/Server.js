const express=require('express');
require('dotenv').config();
const ConectorMongo=require('../Database/Mongo');
const listEndpoints = require('express-list-endpoints');
const cors = require('cors');

class Server{
    constructor(){
       this.App=express();
       this.Port=process.env.PORT;
       this.LoginPath='/api/auth'
       this.CitaPath='/api/cita'
       this.UsuarioPath='/api/usuario'
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
        this.App.use(this.LoginPath,require('../Routes/Auth'));
        this.App.use(this.CitaPath,require('../Routes/Citas'));
        this.App.use(this.UsuarioPath,require('../Routes/Usuarios'));
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
   