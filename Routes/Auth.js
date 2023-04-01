const {Router}=require('express');
const { LoginPOST,GoogleSingIn} = require('../Controllers/Auth');
const {Errors_Relay}=require('../Middlewares/Index')
const { check } = require('express-validator');

const router=Router();

//iniciar sesion 
router.post('/login',[ 
    check('Email')
        .notEmpty().withMessage('El campo Email es obligatorio')
        .isEmail().withMessage('El campo Email no es valido'),
    check('Password')
        .notEmpty().withMessage('El campo Password es obligatorio'),
    Errors_Relay, 
],LoginPOST);

router.post('/google',[
    check('id_token','El id_token es necesario')
        .notEmpty().withMessage('El campo id_token es necesario'),
    Errors_Relay
],GoogleSingIn);
    




module.exports=router