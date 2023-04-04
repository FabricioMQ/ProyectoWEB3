const { request, response } = require('express');
const Expediente = require('../Models/Expedientes');

const GetConsultaMedicaFecha = async (req = request, res = response) => {
    try {
        const { Fecha } = req.body;
        const fechaInicio = new Date(Fecha).setHours(0, 0, 0, 0);
        const fechaFin = new Date(Fecha).setHours(23, 59, 59, 999);

        const expedientes = await Expediente.find(
            { 
              "ConsultasMedicas.Fecha": { 
                $gte: fechaInicio,
                $lte: fechaFin 
              } 
            }, 
            { 
                ConsultasMedicas: 1
            }
          );
        const resultados = [];

        expedientes.forEach(expediente => {
            expediente.ConsultasMedicas.forEach(Consulta=>{
                resultados.push({ _idExpediente: expediente._id,Nombre:expediente.Nombre+' '+expediente.Apellido, Consulta });
            })
        });
        resultados.sort((a, b) => new Date(a.Consulta.Fecha) - new Date(b.Consulta.Fecha));
        res.status(200).json({
            ok: 200,
            msg: `Consultas medicas para la fecha ${Fecha}`,
            data: resultados
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo GetConsultaMedica'
        });
    }

}

const GetConsultaMedicaFechaEspecialidad = async (req = request, res = response) => {
    try {
        const { Fecha ,Especialidad } = req.body;
        const fechaInicio = new Date(Fecha).setHours(0, 0, 0, 0);
        const fechaFin = new Date(Fecha).setHours(23, 59, 59, 999);

        const expedientes = await Expediente.find(
            {
                "ConsultasMedicas.Fecha": { 
                    $gte: fechaInicio,
                    $lte: fechaFin 
                } ,
              "ConsultasMedicas.Especialidad": {
                $regex: new RegExp(Especialidad, "i")
              }
            },
            {
                 ConsultasMedicas: 1
            }
          );

        const resultados = [];

        expedientes.forEach(expediente => {
            expediente.ConsultasMedicas.forEach(Consulta=>{
                resultados.push({ _idExpediente: expediente._id,Nombre:expediente.Nombre+' '+expediente.Apellido, Consulta });
            })
        });
        resultados.sort((a, b) => new Date(a.Consulta.Fecha) - new Date(b.Consulta.Fecha));
        
        res.status(200).json({
            ok: 200,
            msg: `Consultas medicas para la fecha ${Fecha} y especialidd ${Especialidad}`,
            data: resultados
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo GetConsultaMedica'
        });
    }

}


const PostConsultaMedica = async (req = request, res = response) => {
    try {
        const { _id } = req.params;
        const {Peso, Altura, Presion, DescripcionSintomas} = req.body;
        const expediente = await Expediente.findById(_id);
        
        if(!expediente){
            return res.status(404).json({
                ok: 404,
                msg: 'No se encontró el expediente',
              });
        }
        expediente.Peso=Peso;
        expediente.Presion=Presion;
        expediente.ConsultasMedicas.push({
            Fecha:new Date().toISOString(),
            Peso:Peso, 
            Altura:Altura,
            Presion:Presion, 
            DescripcionSintomas:DescripcionSintomas
        })
        await expediente.save();
        
        res.status(200).json(
            {
                ok: 200,
                "msg": "Registrado correctamente"
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo PostConsultaMedica'
        });
    }
}

const PutConsultaMedica = async (req = request, res = response) => {
    try {
        const { _id } = req.params;
        const { _idConsulta, Diagnostico, ExamenSangre, ExamenOrina } = req.body;
        await Expediente.findOneAndUpdate(
            { _id: _id, "ConsultasMedicas._id": _idConsulta },
            { $set: { "ConsultasMedicas.$": { _idConsulta, Diagnostico, ExamenSangre, ExamenOrina } } }
        );
        res.status(200).json({
            ok: 200,
            msg: 'Consulta Actualizada con exito desde el metodo PutConsultaMedica'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo PutConsultaMedica'
        });
    }
}


module.exports={
    GetConsultaMedicaFecha,
    PostConsultaMedica,
    PutConsultaMedica,
    GetConsultaMedicaFechaEspecialidad
}