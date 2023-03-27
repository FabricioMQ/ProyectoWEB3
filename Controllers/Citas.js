const {request, response}=require('express');
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
module.exports={
    RegistrarCitaPOST
}