const { Router } = require('express');
const { PutExpediente, DeleteExpediente, GetExpediente, PostExpediente, GetExpedienteOne, PostEnfermedad, DeleteEnfermedad, PostMedicamentoAlergico, DeleteMedicamentoAlergico, PostContactoEmergencia, DeleteContactoEmergencia } = require('../Controllers/Expedientes');
const { Errors_Relay, ValidaJWT, Roles, RequiereRole, Validate_Identificacion,Validate_ContactoEmergencia} = require('../Middlewares/Index')
const { check } = require('express-validator');


const router = Router();
//expediente
router.get('/', [ValidaJWT, RequiereRole(Roles.admin, Roles.medico), Errors_Relay], GetExpediente);

router.get('/:_id', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.medico),
    check('_id')
        .notEmpty().withMessage('El campo _id está vacio')
        .isMongoId().withMessage('El _id no es valido'),
    Errors_Relay
], GetExpedienteOne);

router.post('/', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.medico),
    check('Identificacion')
        .notEmpty().withMessage('El campo Identificacion es obligatorio')
        .custom(Validate_Identificacion).withMessage('Esta identificacion ya esta en uso'),
    check('Nombre')
        .notEmpty().withMessage('El campo Nombre es obligatorio'),
    check('Apellido')
        .notEmpty().withMessage('El campo Apellido es obligatorio'),
    check('Telefono')
        .notEmpty().withMessage('El campo Telefono es obligatorio'),
    check('Direccion')
        .notEmpty().withMessage('El campo Direccion es obligatorio'),
    check('Peso')
        .notEmpty().withMessage('El campo Peso es obligatorio'),
    check('Edad')
        .notEmpty().withMessage('El campo Edad es obligatorio'),
    check('Altura')
        .notEmpty().withMessage('El campo Altura es obligatorio'),
    check('Enfermedades')
        .notEmpty().withMessage('El campo Enfermedades es obligatorio'),
    check('TipoSangre')
        .notEmpty().withMessage('El campo TipoSangre es obligatorio'),
    check('MedicamentoAlergicos')
        .notEmpty().withMessage('El campo MedicamentoAlergicos es obligatorio'),
    check('ContactosEmergencias')
        .notEmpty().withMessage('El campo ContactosEmergencias es obligatorio'),
    Errors_Relay
], PostExpediente);

router.put('/:_id', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.medico),
    check('_id')
        .notEmpty().withMessage('El campo _id está vacio')
        .isMongoId().withMessage('El _id no es valido'),
    Errors_Relay
], PutExpediente);

router.delete('/:_id', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.medico),
    check('_id')
        .notEmpty().withMessage('El campo _id está vacio')
        .isMongoId().withMessage('El _id no es valido'),
    Errors_Relay
], DeleteExpediente);

//enfermedad
router.post('/enfermedad/:_id', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.medico), 
    check('_id')
        .notEmpty().withMessage('El campo _id está vacio')
        .isMongoId().withMessage('El _id no es valido'),
    check('Nombre')
        .notEmpty().withMessage('El campo Nombre es obligatorio'),
    Errors_Relay
], PostEnfermedad);

router.delete('/enfermedad/:_id', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.medico),
    check('_id')
        .notEmpty().withMessage('El campo _id está vacio')
        .isMongoId().withMessage('El _id no es valido'),
    check('_idEnfermedad')
        .notEmpty().withMessage('El campo _idEnfermedad es obligatorio')
        .isMongoId().withMessage('El _idEnfermedad no es valido'),
    Errors_Relay
], DeleteEnfermedad);


//ContactoEmergencia
router.post('/contactoemergencia/:_id', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.medico), 
    check('_id')
        .notEmpty().withMessage('El campo _id está vacio')
        .isMongoId().withMessage('El _id no es valido'),
    check('Nombre')
        .notEmpty().withMessage('El campo Nombre es obligatorio'),
    check('Apellido')
        .notEmpty().withMessage('El campo Apellido es obligatorio'),
    check('Relacion')
        .notEmpty().withMessage('El campo Relacion es obligatorio'),
    check('Telefono')
        .notEmpty().withMessage('El campo Telefono es obligatorio'),
    check('Direccion')
        .notEmpty().withMessage('El campo Relacion es obligatorio'),
    Errors_Relay
], PostContactoEmergencia);

router.delete('/contactoemergencia/:_id', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.medico),
    check('_id')
        .notEmpty().withMessage('El campo _id está vacio')
        .isMongoId().withMessage('El _id no es valido'),
    check('_idContacto')
        .notEmpty().withMessage('El campo _idEnfermedad es obligatorio')
        .isMongoId().withMessage('El _idContacto no es valido')
        .custom((value, { req }) => {
            return Validate_ContactoEmergencia(req.body._id,value);
        }).withMessage('Necesita minimo un contacto de emergencia'),
    Errors_Relay
], DeleteContactoEmergencia);

//Medicamento alergico
router.post('/medicamentoalergico/:_id', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.medico), 
    check('_id')
        .notEmpty().withMessage('El campo _id está vacio')
        .isMongoId().withMessage('El _id no es valido'),
    check('Nombre')
        .notEmpty().withMessage('El campo Nombre es obligatorio'),
    Errors_Relay
], PostMedicamentoAlergico);

router.delete('/medicamentoalergico/:_id', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.medico),
    check('_id')
        .notEmpty().withMessage('El campo _id está vacio')
        .isMongoId().withMessage('El _id no es valido'),
    check('_idMedicamento')
        .notEmpty().withMessage('El campo _idMedicamento es obligatorio')
        .isMongoId().withMessage('El _idMedicamento no es valido'),
    Errors_Relay
], DeleteMedicamentoAlergico);



module.exports = router