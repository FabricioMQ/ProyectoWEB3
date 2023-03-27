const {Router}=require('express');
const { RegistrarCitaPOST} = require('../Controllers/Citas');
const { check } = require('express-validator');
const {Errors_Relay,Validate_Cita}=require('../Middlewares/Validation_field')

const router=Router();
router.post('/registrar',[
check('Nombre','El Nombre es obligatorio').notEmpty(),
check('Apellido','El Apellido es obligatorio').notEmpty(),
check('Telefono','El Telefono es obligatorio').notEmpty(),
check('Fecha','El Fecha es obligatorio').notEmpty(),
check('Hora','El Hora es obligatorio').notEmpty(),
check('Hora','El formato de hora no es valida').isTime(),
Validate_Cita,
check('Especialidad','El Especialidad es obligatorio').notEmpty(),
check('Medico','El Medico es obligatorio').notEmpty(),
Errors_Relay],RegistrarCitaPOST);


module.exports=router