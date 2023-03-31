const {request, response}=require('express');
const Usuario=require('../Models/Usuarios');
var bcrypt = require('bcryptjs');
const Usuarios = require('../Models/Usuarios');
const GenerarJWT=require('../Helpers/generarWebToken')
const RegistrarPOST=async(req=request, res=response)=>{
    try {

        const {Email,Password}=req.body;
        const usuario = new Usuario({Email,Password});
        var salt = bcrypt.genSaltSync(10);
        usuario.Password = bcrypt.hashSync(Password, salt);
    
        await usuario.save();
        res.status(200).json(
            {
                ok:200,
                "msg":"Registrado correctamente"
            }
        );
    }
    catch(err){
        console.log(err);   
        res.status(500).json({
            ok:500,
            msg:'Ha ocurrido un error inesperado en el servidor en el metodo registrar  post'
        });
    }
      
}
const LoginPOST=async(req=request, res=response)=>{
   try {
    const {Email,Password}=req.body;
    const usuario=await Usuario.findOne({ 'Email': { $regex: new RegExp(Email, 'i') } })

    if(!usuario){
        return res.status(401).json({
            Ok:401 ,
            msg:'Email o Password invalidos',
        });
    } 
    const passwordValid=bcrypt.compareSync(Password,usuario.Password);
    if(!passwordValid){
        return res.status(401).json({
            Ok:401 ,
            msg:'Email o Password invalidos',
        });
    }
    const token=await GenerarJWT(usuario.id,usuario.Rol);
    return res.status(200).json({
        Ok:200,
        msg:'Informacion para acceder a las rutas',
        token:token,
    });
   } catch (err) {
    console.log(err);
    res.status(500).json({
        ok:500,
        msg:'Ha ocurrido un error inesperado en el servidor en el metodo login post'
    });
    }
}
    const GetUsuarios=async(req=request,res=response)=>{
        try {
            const usuarios = await Usuarios.find({}, { Password: 0 });
            res.status(200).json({
                ok:200,
                msg:'Listado de todos los usuarios desde el metodo GetUsuarios',
                data:usuarios
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                ok:500,
                msg:'Ha ocurrido un error inesperado en el servidor en el metodo GetUsuarios'
            });
        }
    }
    const DeleteUsuario=async(req=request,res=response)=>{
        try {
            const {_id}=req.params;
            await Usuarios.findByIdAndDelete({_id});
            res.status(200).json({
                ok:200,
                msg:'Usuario eliminado con exito desde el metodo DeleteUsuarios'
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                ok:500,
                msg:'Ha ocurrido un error inesperado en el servidor en el metodo DeleteUsuarios'
            });
        }
    }
    const PutUsuario=async(req=request,res=response)=>{
        try {
            const {_id}=req.params;
            const {Rol}=req.body;
            await Usuarios.findByIdAndUpdate({_id},{Rol});
            res.status(200).json({
                ok:200,
                msg:'Usuario Actualizado con exito desde el metodo PutUsuarios'
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                ok:500,
                msg:'Ha ocurrido un error inesperado en el servidor en el metodo PutUsuarios'
            });
        }
    }
    //falta login con google 
module.exports={
    RegistrarPOST,
    LoginPOST,
    GetUsuarios,
    DeleteUsuario,
    PutUsuario
}