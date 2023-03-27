const {Schema,model}=require('mongoose');
const SchemaCita = new Schema({
    Nombre: {
      type: String,
      required: [true, 'El campo Nombre es requerido']
    },
    Apellido: {
      type: String,
      required: [true, 'El campo Apellido es requerido']
    },
    Telefono: {
      type: String,
      required: [true, 'El campo Telefono es requerido']
    },
    Fecha: {
      type: Date,
      required: [true, 'El campo Fecha es requerido'],
    },
    Hora: {
      type: String,
      required: [true, 'El campo Hora es requerido'],
    },
    Especialidad: {
      type: String,
      required: [true, 'El campo Especialidad es requerido']
    },
    Medico: {
      type: String,
      required: [true, 'El campo Medico es requerido'],
    }
  });
module.exports = model('Cita', SchemaCita);