const {Router}=require('express');
const { PutUsuario ,PostRegistrarUsuario,DeleteUsuario,GetUsuarios} = require('../Controllers/Usuarios');
const {Errors_Relay,ValidaJWT,Validate_Email,Roles,RequiereRole}=require('../Middlewares/Index')
const { check } = require('express-validator');


const router=Router();

//registrar usuarios
router.post('/', [
    check('Email')
         .notEmpty().withMessage('El campo Email es obligatorio')
        .isEmail().withMessage('El campo Email no es valido')
        .custom(Validate_Email).withMessage('El campo Email esta en uso'),
    check('Password')
        .notEmpty().withMessage('El campo Password es obligatorio'),
  Errors_Relay
], PostRegistrarUsuario);

//actualizar usuarios
router.put('/:_id', [
    ValidaJWT,
    RequiereRole(Roles.admin),
    check('Rol')
        .notEmpty().withMessage('El campo campo Rol es obligatorio'),
    Errors_Relay
  ], PutUsuario);
  

//mostrar usuarios
router.get('/', [ValidaJWT, RequiereRole(Roles.admin)], GetUsuarios);


//eliminar usuarios
router.delete('/:_id',[
    ValidaJWT,
    RequiereRole(Roles.admin),
    check('_id')
        .notEmpty().withMessage('El campo _id está vacio')
        .isMongoId().withMessage('El _id no es valido'),
    Errors_Relay
],DeleteUsuario);


module.exports=router