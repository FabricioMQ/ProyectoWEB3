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
            ],
            $or: [
              { "ConsultasMedicas.RegistrosExamenes": { $exists: false } },
              { "ConsultasMedicas.RegistrosExamenes": {} }
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
const PostExamenesSangre= async (req = request, res = response) => {
  try {
      const { Identificacion } = req.params;
      const { _idConsulta, Hemoglobina, Hematocrito, Triglicéridos,ColesterolTotal,AcidoUridico,Creatinina } = req.body;
      const Examenes = { Hemoglobina: Hemoglobina, Hematocrito: Hematocrito, Triglicéridos:Triglicéridos, ColesterolTotal: ColesterolTotal ,AcidoUridico:AcidoUridico,Creatinina:Creatinina}; // Reemplaza valorA, valorB, valorC, valorD con los valores que deseas insertar

      await Expediente.findOneAndUpdate(
        { "Identificacion": Identificacion, "ConsultasMedicas._id": _idConsulta },
        { $set: { "ConsultasMedicas.$.RegistrosExamenes": Examenes } } 
      );
  
      res.status(200).json({
          ok: 200,
          msg: 'Consulta Actualizada con exito desde el metodo PutConsultaMedica'
      })
  } catch (err) {
      console.log(err);
      res.status(500).json({
          ok: 500,
          msg: 'Ha ocurrido un error inesperado en el servidor en el metodo PostExamenesSangre'
      });
  }
}

const PostExamenesOrina= async (req = request, res = response) => {
  try {
      const { Identificacion } = req.params;
      const { _idConsulta, Glucosa,  Eritrocitos, Color, Leucocitos } = req.body;
      const Examenes = { Glucosa: Glucosa, Eritrocitos: Eritrocitos, Color:Color, Leucocitos: Leucocitos}
      await Expediente.findOneAndUpdate(
        { "Identificacion": Identificacion, "ConsultasMedicas._id": _idConsulta },
        { $set: { "ConsultasMedicas.$.RegistrosExamenes": Examenes } }
      );
  
      res.status(200).json({
          ok: 200,
          msg: 'Consulta Actualizada con exito desde el metodo PostExamenesSangreOrina'
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
  GetConsultaExamenes,
  PostExamenesSangre,
  PostExamenesOrina
}