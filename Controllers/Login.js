const {request, response}=require('express');
const Usuario=require('../Models/Usuarios');
var bcrypt = require('bcryptjs');

const RegistrarPOST=async(req=request, res=response)=>{
    try {

        const {Email,Password}=req.body;
        const usuario = new Usuario({Email,Password});
        var salt = bcrypt.genSaltSync(10);
        usuario.Password = bcrypt.hashSync(Password, salt);
    
        await usuario.save();
        res.json(
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
    const usuario=await Usuario.findOne({'Email':Email})

    if(!usuario){
        return res.status(400).json({
            Ok:false,
            msg:'Email o Password invalidos',
        });
    } 
    const passwordValid=bcrypt.compareSync(Password,usuario.Password);
    if(!passwordValid){
        return res.status(400).json({
            Ok:false,
            msg:'Email o Password invalidos',
        });
    }
    //const token=await GenerarJWT(user.id);
    return res.status(200).json({
        Ok:true,
        msg:'Estoy enviando desde el login',
    });
   } catch (error) {
    console.log(err);
    res.status(500).json({
        ok:500,
        msg:'Ha ocurrido un error inesperado en el servidor en el metodo login post'
    });
    }
}
module.exports={
    RegistrarPOST,
    LoginPOST
}