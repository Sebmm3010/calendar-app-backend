/* 
    Eventos Rutas

    host+api/events
*/

const { Router } = require('express');
const {
    getEventos,
    crearEventos,
    updateEventos,
    deleteEventos
} = require('../controllers/events.controller');
const { validarJwt } = require('../middlewares');


const router = Router();

// Validacion global.
router.use(validarJwt);


// Obtener eventos
router.get('/', getEventos);

// Crear eventos
router.post('/', crearEventos);

// Actualizar eventos
router.put('/:id', updateEventos);

// Borrar eventos
router.delete('/:id', deleteEventos);

module.exports= router;