const { Router } = require('express');
const { PostRegistrarCita, GetCitas, PutCita, DeleteCita } = require('../Controllers/Citas');
const { check } = require('express-validator');
const { Valida_Citas, Errors_Relay, ValidaJWT, RequiereRole, Roles } = require('../Middlewares/Index')

const router = Router();

//Registrar citas
router.post('/', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.recepcionista, Roles.public),
    check('Nombre')
        .notEmpty().withMessage('El campo Nombre es obligatorio'),
    check('Apellido')
        .notEmpty().withMessage('El campo Apellido es obligatorio'),
    check('Telefono')
        .notEmpty().withMessage('El campo Telefono es obligatorio'),
    check('Fecha')
        .notEmpty().withMessage('El campo Fecha es obligatorio')
        .isDate().withMessage('El campo Fecha no es tipo date'),
    check('Hora')
        .notEmpty().withMessage('El campo Hora es obligatorio')
        .isTime().withMessage('El formato de Hora no es valida'),
    check('Especialidad')
        .notEmpty().withMessage('El campo Especialidad es obligatorio'),
    check('Medico')
        .notEmpty().withMessage('El campo Médico es obligatorio')
        .custom((value, { req }) => {
            return Valida_Citas(req.body.Hora,value, req.body.Fecha);
        }).withMessage('No hay cita para esta fecha y hora con el medico'),
    Errors_Relay
], PostRegistrarCita);

//actualizar Cita
    router.put('/:_id', [
        ValidaJWT,
        RequiereRole(Roles.admin, Roles.recepcionista),
        check('_id')
            .notEmpty().withMessage('El campo _id es obligatorio')
            .isMongoId().withMessage('El _id no es valido'),
        check('Fecha')
            .notEmpty().withMessage('El campo Fecha es obligatorio')
            .isDate().withMessage('El campo Fecha no es tipo date'),
        check('Hora')
            .notEmpty().withMessage('El campo Hora es obligatorio')
            .isTime().withMessage('El formato de Hora no es valida'),
        check('Medico')
            .notEmpty().withMessage('El campo Medico es obligatorio')
            .custom((value, { req }) => {
            return Valida_Citas(req.body.Hora,value, req.body.Fecha);
        }).withMessage('No hay cita para esta fecha y hora con el medico'),
        Errors_Relay
      ], PutCita);
      
//mostrar Citas
router.get('/', [ValidaJWT,RequiereRole(Roles.admin, Roles.recepcionista)], GetCitas);
  

//eliminar Citas
router.delete('/:_id',[
    ValidaJWT, 
    RequiereRole(Roles.recepcionista, Roles.admin),
    check('_id')
        .notEmpty().withMessage('El campo _id está vacio')
        .isMongoId().withMessage('El _id no es valido'),
    Errors_Relay
],DeleteCita);




module.exports = router