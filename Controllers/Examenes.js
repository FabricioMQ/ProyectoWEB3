const { request, response } = require('express');
const Expediente = require('../Models/Expedientes');

const GetConsultaExamenes = async (req = request, res = response) => {
  try{    const { Fecha } = req.body;
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
      },
      {
        $match: {
          $or: [
            { "ConsultasMedicas.ExamenSangre": true },
            { "ConsultasMedicas.ExamenOrina": true }
          ]
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
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo GetConsultaExamenes'
        });
    }

    
}

const PostExamenesSangre= async (req = request, res = response) => {
  try {
      const { Identificacion } = req.params;
      const { _idConsulta, Hemoglobina, Hematocrito, Trigliceridos,ColesterolTotal,AcidoUridico,Creatinina } = req.body;
   

      await Expediente.findOneAndUpdate(
        { "Identificacion": Identificacion, "ConsultasMedicas._id": _idConsulta },
        { 
          $set: {
            "ConsultasMedicas.$.RegistrosExamenes": {
              "Hemoglobina": Hemoglobina,
              "Hematocrito": Hematocrito,
              "Trigliceridos": Trigliceridos,
              "ColesterolTotal": ColesterolTotal,
              "AcidoUridico": AcidoUridico,
              "Creatinina": Creatinina 
            }
          }
        }
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
      await Expediente.findOneAndUpdate(
        { "Identificacion": Identificacion, "ConsultasMedicas._id": _idConsulta },
        { 
          $set: {
            "ConsultasMedicas.$.RegistrosExamenes": {
              "Glucosa": Glucosa,
              "Eritrocitos": Eritrocitos,
              "Color": Color,
              "Leucocitos": Leucocitos
          }
        }
      }
      );
      
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