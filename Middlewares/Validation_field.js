const { validationResult } = require('express-validator');
const { request,response } = require('express');
const Usuario=require('../Models/Usuarios');
const Expediente = require('../Models/Expedientes');

const Errors_Relay= async(req=request,res=response,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        msg:'Error en los campos ,verificar ', 
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
  return await  Expediente.exists({'Identificacion':value}).then(expediente => {
    if (expediente) {
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