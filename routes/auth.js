/* 
    Usuarios/auth Rutas

    host+api/auth
*/

const { Router } = require("express");
const router = Router();
const { check } = require('express-validator');
const { validarCapos } = require("../middlewares/validarCampos");
const {
    login,
    crearUser,
    renewToken
} = require("../controllers/auth.controller");



// Loguear
router.post('/',
    [
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Solo se acepta el formato emal **@**.com').isEmail(),
        check('password', 'La constraseña es obligatoria').not().isEmpty(),
        check('password', 'La constraseña debe de tener almenos 5 caracteres').isLength({ min: 5 }),
        validarCapos
    ], login);

// Registrar usuario
router.post('/new',
    [ // Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Solo se acepta el formato emal **@**.com').isEmail(),
        check('password', 'La constraseña es obligatoria').not().isEmpty(),
        check('password', 'La constraseña debe de tener almenos 5 caracteres').isLength({ min: 5 }),
        validarCapos
    ], crearUser);

// Renovar Token
router.get('/renew', renewToken);


module.exports = router;