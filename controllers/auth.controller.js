const bcrypt = require('bcryptjs');
const { request, response } = require("express");
const Usuario = require('../models/usuario');



const login = async (req = request, res = response) => {

    const { email, password } = req.body;


    try {

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro un usuaro con ese email'
            });
        }

        // Confirmar contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password invalida'
            });
        }

        // Se genera el JWT

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con un administrador'
        });
    }
}

const crearUser = async (req = request, res = response) => {

    const { email, password } = req.body;

    const aux = await Usuario.findOne({ email });

    if (aux) {
        return res.status(400).json({
            ok: false,
            msg: 'Este email de usuario ya se encuentra en uso'
        });
    }

    try {
        const usuario = new Usuario(req.body);

        // Encriptar contraseña

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Se genera un JWT


        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con un administrador'
        });
    }
}

const renewToken = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'renovar'
    });
}

module.exports = {
    login,
    crearUser,
    renewToken
}