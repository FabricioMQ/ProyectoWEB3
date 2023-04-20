const { request, response } = require('express');
const Expediente = require('../Models/Expedientes');

const GetConsultaMedicaFecha = async (req = request, res = response) => {
    try {
        const { Fecha } = req.body;
        const momentWithTimeZone = req.moment;
        const fechaInicio = momentWithTimeZone(Fecha).startOf('day').toDate(); // primera hora del día
        const fechaFin = momentWithTimeZone(Fecha).endOf('day').toDate(); // última hora del día
        const expedientes = await Expediente.aggregate([
            {
              $match: {
                "ConsultasMedicas.Fecha": {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            },
            {
              $project: {
                Identificacion: 1,
                Nombre: 1,
                Apellido: 1,
                ConsultasMedicas: {
                  $filter: {
                    input: "$ConsultasMedicas",
                    as: "consulta",
                    cond: {
                      $and: [
                        { $gte: ["$$consulta.Fecha", fechaInicio] },
                        { $lte: ["$$consulta.Fecha", fechaFin] }
                      ]
                    }
                  }
                }
              }
            }
          ]);
        const resultados = [];

        expedientes.forEach(expediente => {
            expediente.ConsultasMedicas.forEach(Consulta=>{
                resultados.push({ Identificacion: expediente.Identificacion,Nombre:expediente.Nombre+' '+expediente.Apellido, Consulta });
            })
        });
        resultados.sort((a, b) => a.Consulta.Fecha - b.Consulta.Fecha);
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

const PostConsultaMedica = async (req = request, res = response) => {
    try {
        const momentWithTimeZone = req.moment;
        /*En este apartado la fecha y hora se trabaja en un solo campo , aqui obtenemos la fecha y hora del server que se le
          configuiro con el middlewares fecha server para que tenga la zona horaria de costa rica 
        */
        const   Fecha = momentWithTimeZone().format('YYYY-MM-DD HH:mm:ss');
        const {Peso, Altura, Presion, DescripcionSintomas,Identificacion} = req.body
        const expediente = await Expediente.findOne({"Identificicacion":Identificacion});
        
        if(!expediente){
            return res.status(404).json({
                ok: 404,
                msg: 'No se encontró el expediente',
              });
        }
        expediente.Peso=Peso;
        expediente.Presion=Presion;
        expediente.Altura=Altura;
        expediente.ConsultasMedicas.push({
            Fecha:Fecha,
            Peso:Peso, 
            Altura:Altura,
            Presion:Presion, 
            DescripcionSintomas:DescripcionSintomas
        })
        await expediente.save();
        
        res.status(200).json(
            {
                ok: 200,
                msg: 'Consulta registrada con exito'
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
        const { Identificacion } = req.params;
        const { _idConsulta, Diagnostico, ExamenSangre, ExamenOrina } = req.body;
        await Expediente.findOneAndUpdate(
            { "Identificacion": Identificacion, "ConsultasMedicas._id": _idConsulta },
            { $set: { 
                "ConsultasMedicas.$.Diagnostico": Diagnostico,
                "ConsultasMedicas.$.ExamenSangre": ExamenSangre,
                "ConsultasMedicas.$.ExamenOrina": ExamenOrina 
            } }
        );
        res.status(200).json({
            ok: 200,
            msg: 'Consulta Actualizada con exito'
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
}