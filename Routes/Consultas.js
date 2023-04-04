const { Router } = require('express');
const { GetConsultaMedicaFechaEspecialidad,PostConsultaMedica,PutConsultaMedica, GetConsultaMedicaFecha } = require('../Controllers/Consultas');
const { check } = require('express-validator');
const { Valida_Citas, Errors_Relay, ValidaJWT, RequiereRole, Roles } = require('../Middlewares/Index')

const router = Router();

router.get('/', [ValidaJWT, RequiereRole(Roles.admin, Roles.medico), Errors_Relay], GetConsultaMedicaFecha);


router.get('/FechaEspecialidad', [ValidaJWT, RequiereRole(Roles.admin, Roles.medico), Errors_Relay], GetConsultaMedicaFechaEspecialidad);

router.post('/', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.enfermera),
    check('_id')
    .notEmpty().withMessage('El campo _id es obligatorio')
    .isMongoId().withMessage('El _id no es valido'),
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

router.put('/:_id', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.medico),
    check('_id')
        .notEmpty().withMessage('El campo _id está vacio')
        .isMongoId().withMessage('El _id no es valido'),
    check('_idConsulta')
        .notEmpty().withMessage('El campo _idConsulta es obligatorio')
        .isMongoId().withMessage('El _idConsulta no es valido'),
    check(' Diagnostico')
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
