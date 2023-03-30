const {Router}=require('express');
const { RegistrarPOST , LoginPOST,DeleteUsuario,PutUsuario,GetUsuarios} = require('../Controllers/Login');
const {Validate_Email,Errors_Relay,ValidaJWT,RequiereRole,Roles}=require('../Middlewares/Index')
const { check } = require('express-validator');


const router=Router();

//iniciar sesion 
router.post('/auth',
[check('Email','El Email es obligatorio').notEmpty(),
check('Email','El Email no es valido').isEmail(),
check('Password','El Password es obligatorio').notEmpty(),Errors_Relay],LoginPOST);

//registrar usuarios
router.post('/registrar',
[check('Email','El Email es obligatorio').notEmpty(),
check('Email','El Email no es valido').isEmail(),
check('Email','El Email esta en uso').custom(Validate_Email),
check('Password','El Password es obligatorio').notEmpty()
,Errors_Relay],RegistrarPOST);

//actualizar usuarios
router.put('/actualizar/:_id',
[ValidaJWT,
RequiereRole(Roles.admin),
check('Rol','El campo Rol es obligatorio').notEmpty(),
Errors_Relay],PutUsuario);

//mostrar usuarios
router.get('/usuarios',
[ValidaJWT,
RequiereRole(Roles.admin),
Errors_Relay
],GetUsuarios);

//eliminar usuarios
router.delete('/eliminar/:_id',
[ValidaJWT,RequiereRole(Roles.admin),
check('_id','El campo _id está vacio').notEmpty(),
check('_id','El _id no es valido').isMongoId(),
Errors_Relay],DeleteUsuario);






module.exports=router