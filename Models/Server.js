const express=require('express');
require('dotenv').config();
const ConectorMongo=require('../Database/Mongo');
const listEndpoints = require('express-list-endpoints');
const cors = require('cors');
const ZonaHoraria=require('../Middlewares/FechaServer');


class Server{
    constructor(){
       this.App=express();
       this.Port=process.env.PORT;
       this.LoginPath='/api/auth'
       this.CitaPath='/api/cita'
       this.UsuarioPath='/api/usuario'
       this.ExpedientePath='/api/expediente'
       this.ConsultaPath='/api/consulta'
       this.ExamenesPath='/api/examanes'
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
        this.App.use(this.LoginPath,ZonaHoraria,require('../Routes/Auth'));
        this.App.use(this.CitaPath,ZonaHoraria,require('../Routes/Citas'));
        this.App.use(this.UsuarioPath,ZonaHoraria,require('../Routes/Usuarios'));
        this.App.use(this.ExpedientePath,ZonaHoraria,require('../Routes/Expedientes'));
        this.App.use(this.ConsultaPath,ZonaHoraria,require('../Routes/Consultas'));
        this.App.use(this.ExamenesPath,ZonaHoraria,require('../Routes/Examenes'))
        console.log(listEndpoints(this.App,{ extended: true}));
    }

    
    MiddleWares(){
        this.App.use(express.json());
    }
    
    MongoDB(){
        ConectorMongo();
    }
    
}    
    module.exports=Server;
   