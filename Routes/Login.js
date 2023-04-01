const {Router}=require('express');
const { RegistrarPOST , LoginPOST,DeleteUsuario,PutUsuario,GetUsuarios ,GoogleSingIn} = require('../Controllers/Login');
const {Validate_Email,Errors_Relay,ValidaJWT,RequiereRole,Roles}=require('../Middlewares/Index')
const { check } = require('express-validator');

const router=Router();

//iniciar sesion 
router.post('/auth',[ 
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
    

//registrar usuarios
router.post('/registrar', [
    check('Email')
         .notEmpty().withMessage('El campo Email es obligatorio')
        .isEmail().withMessage('El campo Email no es valido')
        .custom(Validate_Email).withMessage('El campo Email esta en uso'),
    check('Password')
        .notEmpty().withMessage('El campo Password es obligatorio'),
  Errors_Relay
], RegistrarPOST);

//actualizar usuarios
router.put('/actualizar/:_id', [
    ValidaJWT,
    RequiereRole(Roles.admin),
    check('Rol')
        .notEmpty().withMessage('El campo campo Rol es obligatorio'),
    Errors_Relay
  ], PutUsuario);
  

//mostrar usuarios
router.get('/usuarios', [ValidaJWT, RequiereRole(Roles.admin)], GetUsuarios);


//eliminar usuarios
router.delete('/eliminar/:_id',[
    ValidaJWT,
    RequiereRole(Roles.admin),
    check('_id')
        .notEmpty().withMessage('El campo _id está vacio')
        .isMongoId().withMessage('El _id no es valido'),
    Errors_Relay
],DeleteUsuario);






module.exports=router