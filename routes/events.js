/* 
    Eventos Rutas

    host+api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers');
const {
    getEventos,
    crearEventos,
    updateEventos,
    deleteEventos
} = require('../controllers/events.controller');
const { validarJwt, validarCampos } = require('../middlewares');


const router = Router();

// Validacion global.
router.use(validarJwt);


// Obtener eventos
router.get('/', getEventos);

// Crear eventos
router.post('/',
    [//Middlewares
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La Fecha de inicio es obligatorio').custom(isDate),
        check('end', 'La Fecha de finalizacion es obligatoria').custom(isDate),

        validarCampos
    ], crearEventos);

// Actualizar eventos
router.put('/:id', updateEventos);

// Borrar eventos
router.delete('/:id', deleteEventos);

module.exports = router;