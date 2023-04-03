const { Router } = require('express');
const { GetConsultaMedica,PostConsultaMedica,PutConsultaMedica } = require('../Controllers/Consultas');
const { check } = require('express-validator');
const { Valida_Citas, Errors_Relay, ValidaJWT, RequiereRole, Roles } = require('../Middlewares/Index')

const router = Router();

router.get('/', [ValidaJWT, RequiereRole(Roles.admin, Roles.medico), Errors_Relay], GetConsultaMedica);

router.post('/', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.enfermera),
    check('Peso')
        .notEmpty().withMessage('El campo Identificacion es obligatorio'),
    check('Altura')
        .notEmpty().withMessage('El campo Altura es obligatorio'),
    check('Presion')
        .notEmpty().withMessage('El campo Presion es obligatorio'),
    check('DescripcionSintomas')
        .notEmpty().withMessage('El campo DescripcionSintomas es obligatorio'),
    Errors_Relay
], PostConsultaMedica);

router.put('/:_id', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.medico),
    check('_id')
        .notEmpty().withMessage('El campo _id está vacio')
        .isMongoId().withMessage('El _id no es valido'),
    Errors_Relay
], PutConsultaMedica);


module.exports=router
