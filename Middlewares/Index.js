const ValidarCampos=require('../Middlewares/Validation_field');
const ValidarJWT = require('../Middlewares/ValidarJWT');
const Validar_Role=require('../Middlewares/Validar_Role');
const Validar_Cita=require('../Middlewares/Validar_Cita');
const Validate_ContactoEmergencia  = require('../Middlewares/Validar_ContactoEmergencia');
module.exports={
    ...ValidarCampos,
    ...ValidarJWT,
    ...Validar_Role,
    ...Validar_Cita,
    ...Validate_ContactoEmergencia
}
