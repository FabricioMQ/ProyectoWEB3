const Cita=require('../Models/Citas');

const Valida_Citas = (hora, medico, fecha) => {
  return Cita.exists({ 'Hora': hora, 'Medico':  { $regex: new RegExp(medico, 'i') }, 'Fecha': fecha }).then(cita => {
    if (cita) {
      return Promise.reject(`No hay cita para esta fecha y hora con el medico `);
    } else { 
      return Promise.resolve();
    }
  });
};
module.exports={Valida_Citas}