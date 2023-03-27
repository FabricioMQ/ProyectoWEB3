const {Router}=require('express');
const { RegistrarPOST , LoginPOST} = require('../Controllers/Login');
const {Errors_Relay,Validate_Email}=require('../Middlewares/Validation_field')
const { check } = require('express-validator');

const router=Router();

router.post('/auth',
[check('Email','El Email es obligatorio').notEmpty(),
check('Email','El Email no es valido').isEmail(),
check('Password','El Password es obligatorio').notEmpty(),Errors_Relay],LoginPOST);


router.post('/registrar',
[check('Email','El Email es obligatorio').notEmpty(),
check('Email','El Email no es valido').isEmail(),
check('Email','El email no valido').custom(Validate_Email),
check('Password','El Password es obligatorio').notEmpty()
,Errors_Relay],RegistrarPOST);

module.exports=router