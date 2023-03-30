const {Router}=require('express');
const { RegistrarCitaPOST, GetCitas,PutCita, DeleteCita} = require('../Controllers/Citas');
const { check } = require('express-validator');
const {Valida_Citas,Errors_Relay,ValidaJWT,RequiereRole,Roles}=require('../Middlewares/Index')

const router=Router();

//Registrar citas
router.post('/registrar',[
ValidaJWT,
RequiereRole(Roles.admin,Roles.recepcionista,Roles.public),
check('Nombre','El Nombre es obligatorio').notEmpty(),
check('Apellido','El Apellido es obligatorio').notEmpty(),
check('Telefono','El Telefono es obligatorio').notEmpty(),
check('Fecha','El Fecha es obligatorio').notEmpty(),
check('Hora','El Hora es obligatorio').notEmpty(),
check('Hora','El formato de Hora no es valida').isTime(),
check('Especialidad','El Especialidad es obligatorio').notEmpty(),
check('Medico','El Medico es obligatorio').notEmpty(),
Valida_Citas,
Errors_Relay],RegistrarCitaPOST);

//actualizar Cita
router.put('/actualizar/:_id',
[ValidaJWT,
RequiereRole(Roles.admin,Roles.recepcionista),
check('_id','El campo _id es obligatorio').notEmpty(),
check('_id','El _id no es valido').isMongoId(),
check('Fecha','El campo Fecha es obligatorio').notEmpty(),
check('Hora','El campo Hora es obligatorio').notEmpty(),
check('Hora','El formato de Hora no es valida').isTime(),
check('Especialidad','El campo Especialidad es obligatorio').notEmpty(),
check('Medico','El campo Medico es obligatorio').notEmpty(),
Errors_Relay],PutCita);

//mostrar Citar 
router.get('/mostrar',
[ValidaJWT,
RequiereRole(Roles.admin,Roles.recepcionista),
Errors_Relay],GetCitas);

//eliminar Citas
router.delete('/eliminar/:_id',
[ValidaJWT,RequiereRole(Roles.recepcionista,Roles.admin),
check('_id','El campo _id está vacio').notEmpty(),
check('_id','El _id no es valido').isMongoId(),
Errors_Relay],DeleteCita);




module.exports=router