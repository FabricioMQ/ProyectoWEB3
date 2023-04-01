const { request, response } = require('express');
const Usuario = require('../Models/Usuarios');
var bcrypt = require('bcryptjs');
const GenerarJWT = require('../Helpers/GenerarWebToken')
const { GoogleVerify } = require('../Helpers/VerificarGoogle');


const LoginPOST = async (req = request, res = response) => {
    try {
        const { Email, Password } = req.body;
        const usuario = await Usuario.findOne({ 'Email': { $regex: new RegExp(Email, 'i') } })

        if (!usuario) {
            return res.status(401).json({
                Ok: 401,
                msg: 'Email o Password invalidos',
            });
        }
        const passwordValid = bcrypt.compareSync(Password, usuario.Password);
        if (!passwordValid) {
            return res.status(401).json({
                Ok: 401,
                msg: 'Email o Password invalidos',
            });
        }
        const token = await GenerarJWT(usuario.id, usuario.Rol);
        return res.status(200).json({
            Ok: 200,
            msg: 'Informacion para acceder a las rutas',
            token: token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo login post'
        });
    }
}
const GoogleSingIn = async (req = request, res = response) => {

    const { id_token } = req.body;

    try {
        const googleUser = await GoogleVerify(id_token);

        const { Email} = googleUser;

        let usuario = await Usuario.findOne({ Email });

        if (!usuario) {
            const data = {
                Email: Email,
                Password: 'p',
                Google: true,
            }
            usuario = new Usuarios(data);
            await usuario.save();
        }

        const token = await GenerarJWT(usuario.id, usuario.Rol);

        return res.status(200).json({
            Ok: 200,
            msg: 'Informacion para acceder a las rutas',
            token: token,
        });

    }
    catch (err) {
        console.log(err)
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar. Intentar con otro'
        });
    }
}


module.exports = {
    LoginPOST,
    GoogleSingIn
}