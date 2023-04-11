const { Router } = require('express');
const { PostConsultaMedica,PutConsultaMedica, GetConsultaMedicaFecha } = require('../Controllers/Consultas');
const { check } = require('express-validator');
const { Errors_Relay, ValidaJWT, RequiereRole, Roles } = require('../Middlewares/Index')

const router = Router();

router.get('/', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.medico),
    check('Fecha')
        .notEmpty().withMessage('El campo Fecha está vacio')
        .isDate().withMessage('El Fecha no es valido , formato date'),
    Errors_Relay
    ],GetConsultaMedicaFecha);



router.post('/', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.enfermera),
    check('Identificacion')
    .notEmpty().withMessage('El campo Identificacion es obligatorio'),
    check('Peso')
        .notEmpty().withMessage('El campo Identificacion es obligatorio'),
    check('Altura')
        .notEmpty().withMessage('El campo Altura es obligatorio'),
    check('Presion')
        .notEmpty().withMessage('El campo Presion es obligatorio'),
    check('DescripcionSintomas')
        .notEmpty().withMessage('El campo DescripcionSintomas es obligatorio'),
    check('Especialidad')
        .notEmpty().withMessage('El campo Especialidad es obligatorio'),
    Errors_Relay
], PostConsultaMedica);

router.put('/:Identificacion', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.medico),
    check('Identificacion')
        .notEmpty().withMessage('El campo Identificacion está vacio'),
    check('_idConsulta')
        .notEmpty().withMessage('El campo _idConsulta es obligatorio')
        .isMongoId().withMessage('El _idConsulta no es valido'),
    check('Diagnostico')
        .notEmpty().withMessage('El campo Diagnostico es obligatorio'),
    check('ExamenSangre')
        .notEmpty().withMessage('El campo ExamenSangre es obligatorio')
        .isBoolean().withMessage('El campo ExamenSangre no es boolean'),
    check('ExamenOrina')
        .notEmpty().withMessage('El campo ExamenOrina es obligatorio')
        .isBoolean().withMessage('El campo ExamenOrina no es boolean'),
    Errors_Relay
], PutConsultaMedica);


module.exports=router
