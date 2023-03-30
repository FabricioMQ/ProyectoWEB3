const Valida_Citas = async (req, res) => {
    return Usuario.exists({ 'Hora': req.Hora, 'Medico': { $regex: new RegExp(req.Medico.replace(/\s/g, ''), 'i') }, 'Fecha': req.Fecha }).then(usuario => {
      if (usuario) {
        return Promise.reject(`No hay cita para esta fecha y hora con el medico `);
      } else { 
        return Promise.resolve('Si existe cita')
      }
    });
  }
module.exports={Valida_Citas}