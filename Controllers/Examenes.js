const { request, response } = require('express');
const Expediente = require('../Models/Expedientes');

const GetConsultaExamenes = async (req = request, res = response) => {
    try {
        const { Fecha } = req.body;
        const fechaInicio = new Date(Fecha).setHours(0, 0, 0, 0);
        const fechaFin = new Date(Fecha).setHours(23, 59, 59, 999);

        const expedientes = await Expediente.find({
            "ConsultasMedicas.Fecha": { 
                $gte: fechaInicio,
                $lte: fechaFin 
              } ,
            $or: [
              { "ConsultasMedicas.ExamenSangre": true },
              { "ConsultasMedicas.ExamenOrina": true }
            ]
          }, {
            ConsultasMedicas: 1
          });

        const resultados = [];

        expedientes.forEach(expediente => {
            expediente.ConsultasMedicas.forEach(Consulta=>{
                resultados.push({ Identificacion: expediente.Identificacion,Nombre:expediente.Nombre+' '+expediente.Apellido, Consulta });
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
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo GetConsultaExamenes'
        });
    }

}