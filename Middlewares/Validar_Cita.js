const Cita=require('../Models/Citas');
const Valida_Citas = async (req, res) => {
    return Cita.exists({ 'Hora': req.Hora, 'Medico':  { $regex: new RegExp(req.Medico, 'i') }, 'Fecha': req.Fecha }).then(cita => {
      if (cita) {
        return Promise.reject(`No hay cita para esta fecha y hora con el medico `);
      } else { 
        return Promise.resolve('Si existe cita')
      }
    });
  }
module.exports={Valida_Citas}