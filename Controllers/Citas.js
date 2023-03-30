const {request, response}=require('express');
const Citas = require('../Models/Citas');
const Cita=require('../Models/Citas');

const RegistrarCitaPOST=async(req=request, res=response)=>{
    try {
        const {Nombre,Apellido,Telefono,Fecha,Hora,Especialidad,Medico}=req.body;
        const cita = new Cita({Nombre,Apellido,Telefono,Fecha,Hora,Especialidad,Medico});
        await cita.save();
        res.json(
            {
                ok:200,
                "msg":"Registrado cita correctamente",
            }
        );
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            ok:500,
            msg:'Ha ocurrido un error inesperado en el servidor en el metodo registrar cita post'
        });
    }
}
const DeleteCita=async(req=request,res=response)=>{
    try {
        const {_id}=req.params;
        await Citas.findByIdAndDelete(_id);
        res.status(200).json({
            ok:200,
            msg:'Usuario eliminado con exito desde el metodo DeleteCitas'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok:500,
            msg:'Ha ocurrido un error inesperado en el servidor en el metodo DeleteCitas'
        });
    }
}
const PutCita=async(req=request,res=response)=>{
    try {
        const {_id}=req.params;
        const {Fecha,Hora,Medico}=req.body;
        await Citas.findByIdAndUpdate({_id},Fecha,Hora,Medico);
        res.status(200).json({
            ok:200,
            msg:'Cita Actualizada con exito desde el metodo PutCitas'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok:500,
            msg:'Ha ocurrido un error inesperado en el servidor en el metodo PutCitas'
        });
    }
}
const GetCitas=async(req=request,res=response)=>{
    try {
        const citas = await Citas.find();
        res.status(200).json({
            ok:200,
            msg:'Listado de todos los usuarios desde el metodo GetCitas',
            data:citas
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok:500,
            msg:'Ha ocurrido un error inesperado en el servidor en el metodo GetCitas'
        });
    }
}
module.exports={
    RegistrarCitaPOST,
    DeleteCita,
    PutCita,
    GetCitas
}