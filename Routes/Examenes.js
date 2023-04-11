const { Router } = require('express');
const {GetConsultaExamenes, PostExamenesSangre, PostExamenesOrina} = require('../Controllers/Examenes');
const { Errors_Relay, ValidaJWT, Roles, RequiereRole} = require('../Middlewares/Index')
const { check } = require('express-validator');


const router = Router();
router.get('/', [ValidaJWT, RequiereRole(Roles.admin, Roles.enfermera), Errors_Relay], GetConsultaExamenes);


router.post('/sangre/:Identificacion', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.enfermera),
    check('Identificacion')
        .notEmpty().withMessage('El campo Identificacion es obligatorio'),
    check('_idConsulta')
        .notEmpty().withMessage('El campo _idConsulta es obligatorio')
        .isMongoId().withMessage('El _idConsulta no es valido'),
    check('Hemoglobina')
        .notEmpty().withMessage('El campo Hemoglobina es obligatorio'),
    check('Hematocrito')
        .notEmpty().withMessage('El campo Hematocrito es obligatorio'),
    check('Trigliceridos')
        .notEmpty().withMessage('El campo Triglicéridos es obligatorio'),
    check('ColesterolTotal')
        .notEmpty().withMessage('El campo ColesterolTotal es obligatorio'),
    check('AcidoUridico')
        .notEmpty().withMessage('El campo AcidoUridico es obligatorio'),
    check('Creatinina')
        .notEmpty().withMessage('El campo Creatinina es obligatorio'),
    Errors_Relay
], PostExamenesSangre);

router.post('/orina/:Identificacion', [
    ValidaJWT,
    RequiereRole(Roles.admin, Roles.enfermera),
    check('Identificacion')
        .notEmpty().withMessage('El campo Identificacion es obligatorio'), 
    check('_idConsulta')
        .notEmpty().withMessage('El campo _idConsulta es obligatorio')
        .isMongoId().withMessage('El _idConsulta no es valido'),
    check('Glucosa')
        .notEmpty().withMessage('El campo Glucosa es obligatorio'),
    check('Eritrocitos')
        .notEmpty().withMessage('El campo Eritrocitos es obligatorio'),
    check('Color')
        .notEmpty().withMessage('El campo Color es obligatorio'),
    check('Leucocitos')
        .notEmpty().withMessage('El campo Leucocitos es obligatorio'),
    Errors_Relay
], PostExamenesOrina);

module.exports=router