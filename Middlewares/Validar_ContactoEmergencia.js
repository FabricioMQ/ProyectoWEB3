const Expediente = require('../Models/Expedientes');

const Validate_ContactoEmergencia=async(expedienteId,contactoId)=>{
    Expediente.exists({ _id: expedienteId, 'ContactosEmergencias._id': contactoId }, { 'ContactosEmergencias.$': 1 }).then(expediente => {
      if (expediente) {
        return Promise.reject('Necesita minimo un contacto de emergencia ');
      }else{
        return Promise.resolve('Si puede eliminar el contacto')
      }
    });
  }
module.exports={Validate_ContactoEmergencia}