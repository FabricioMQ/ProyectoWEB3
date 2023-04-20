const { request, response } = require('express');
const Usuario = require('../Models/Usuarios');
var bcrypt = require('bcryptjs');

const PostRegistrarUsuario = async (req = request, res = response) => {
    try {

        const { Email, Password } = req.body;
        const usuario = new Usuario({ Email, Password });
        var salt = bcrypt.genSaltSync(10);
        usuario.Password = bcrypt.hashSync(Password, salt);

        await usuario.save();
        res.status(200).json(
            {
                ok: 200,
                msg: "Usuario registrado con exito"
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo registrar  post'
        });
    }

}

const GetUsuarios = async (req = request, res = response) => {
    try {
        const usuarios = await Usuario.find({}, { Password: 0 });
        res.status(200).json({
            ok: 200,
            msg: 'Listado de todos los usuarios',
            data: usuarios
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo GetUsuarios'
        });
    }
}
const DeleteUsuario = async (req = request, res = response) => {
    try {
        const { _id } = req.params;
        await Usuario.findByIdAndDelete({ _id });
        res.status(200).json({
            ok: 200,
            msg: 'Usuario eliminado con exito'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo DeleteUsuarios'
        });
    }
}
const PutUsuario = async (req = request, res = response) => {
    try {
        const { _id } = req.params;
        const { Rol } = req.body;
        await Usuario.findByIdAndUpdate({ _id }, { Rol });
        res.status(200).json({
            ok: 200,
            msg: 'Usuario Actualizado con exito'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo PutUsuarios'
        });
    }
}
module.exports={
    PutUsuario,
    DeleteUsuario,
    GetUsuarios,
    PostRegistrarUsuario
}