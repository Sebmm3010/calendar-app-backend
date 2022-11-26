const { response, request } = require("express")
const jwt = require('jsonwebtoken');

const validarJwt = (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay una peticion que validar'
        });
    }

    try {
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_KEY
        );

        req.uid = uid;
        req.name= name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalida'
        });
    }

    next();
}


module.exports = {
    validarJwt
}