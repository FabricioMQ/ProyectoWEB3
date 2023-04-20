const {request, response}=require('express');
const Cita=require('../Models/Citas');


const PostRegistrarCita=async(req=request, res=response)=>{
    try {
        const {Nombre,Apellido,Telefono,Fecha,Hora,Especialidad,Medico}=req.body;
        const cita = new Cita({Nombre,Apellido,Telefono,Fecha,Hora,Especialidad,Medico});
        await cita.save();
        res.status(200).json(
            {
                ok:200,
                msg:'Cita registrada Correctamente',
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
        await Cita.findByIdAndDelete(_id);
        res.status(200).json({
            ok:200,
            msg:'Cita eliminada con exito'
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
        await Cita.findByIdAndUpdate({_id},Fecha,Hora,Medico);
        res.status(200).json({
            ok:200,
            msg:'Cita actualizada con exito'
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
        const momentWithTimeZone = req.moment;
        //Esta es la fecha y hora del server que uno configura , seria costa rica 
        const Fecha = momentWithTimeZone().format('YYYY-MM-DD');
        const Hora= momentWithTimeZone().format('HH:mm');

        const citas = await Cita.find({Fecha: { $gte: new Date(`${Fecha}T00:00:00.000Z`)}});
          
        //se utiliza para filtrar las citas , si paso la hora la cita no se muestra 
        //obtenemos solo la fecha porque no se guarda la hora en el campo Fecha
        //Se filtra manual porque la hora se guarda en un campo aparte 
        const citasFiltradas = citas.filter(cita => {
            const citaMoment = momentWithTimeZone(`${cita.Fecha.toISOString().slice(0, 10)} ${cita.Hora}`, 'YYYY-MM-DD HH:mm');
            const fechaHoraActual = momentWithTimeZone(`${Fecha}T${Hora}`, 'YYYY-MM-DDTHH:mm')
            return citaMoment.isSameOrAfter(fechaHoraActual);
          }).sort((cita1, cita2) => {
            const cita1Moment = momentWithTimeZone(`${cita1.Fecha.toISOString().slice(0, 10)}T${cita1.Hora}`, 'YYYY-MM-DDTHH:mm');
            const cita2Moment = momentWithTimeZone(`${cita2.Fecha.toISOString().slice(0, 10)}T${cita2.Hora}`, 'YYYY-MM-DDTHH:mm');
            return cita1Moment - cita2Moment;
          });
          
        res.status(200).json({
            ok:200,
            msg:'Listado de todas las citas',
            Fecha,
            data:citasFiltradas
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
    PostRegistrarCita,
    DeleteCita,
    PutCita,
    GetCitas
}