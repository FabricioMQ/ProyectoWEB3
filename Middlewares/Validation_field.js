const { validationResult } = require('express-validator');
const { request,response } = require('express');
const Usuario=require('../Models/Usuarios');

const Errors_Relay= async(req=request,res=response,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        msg:'Error en las campos', 
        data: errors.array() });
    }
    next();
}
const Validate_Email=async(value)=>{
    return await Usuario.exists({'Email':value}).then(usuario => {
      if (usuario) {
        return Promise.reject('Email ya esta en uso');
      }else{
        return Promise.resolve('Email no esta en uso')
      }
    });
}
const Validate_Identificacion=async(value)=>{
  return await Usuario.exists({'Identificacion':value}).then(usuario => {
    if (usuario) {
      return Promise.reject('La Identificacion ya pertenece a un expediente ');
    }else{
      return Promise.resolve('La Identificacion esta li')
    }
  });
}

module.exports={
    Errors_Relay,
    Validate_Email,
    Validate_Identificacion
}