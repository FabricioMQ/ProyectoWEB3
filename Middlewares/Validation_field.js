const { validationResult } = require('express-validator');
const Usuario=require('../Models/Usuarios');

const Errors_Relay= async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}
const Validate_Email=async(value)=>{
    return Usuario.exists({'Email':value}).then(usuario => {
      if (usuario) {
        return Promise.reject('Email ya esta en uso');
      }else{
        return Promise.resolve('Email no esta en uso')
      }
    });
}
const Validate_Cita=async(req,res)=>{
  return Usuario.exists({'Hora':req.Hora,'Medico':req.Medico,'Fecha':req.Fecha}).then(usuario => {
    if (usuario) {
      return Promise.reject(`No hay cita para esta fecha y hora con el medico `);
    }else{
      return Promise.resolve('Si existe cita')
    }
  });
}

module.exports={
    Errors_Relay,
    Validate_Email,
    Validate_Cita
}