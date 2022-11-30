const bcrypt = require('bcryptjs');
const { request, response } = require("express");
const { jwtGenerator } = require('../helpers/jwtGenerator');
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

        // Generar JWT

        const token = jwtGenerator(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
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

        // Generar JWT

        const token = jwtGenerator(usuario.id, usuario.name);


        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con un administrador'
        });
    }
}

const renewToken = async(req = request, res = response) => {
    const { uid, name }= req;
    // Generar un nuevo token
    const token= await jwtGenerator(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    });
}

module.exports = {
    login,
    crearUser,
    renewToken
}