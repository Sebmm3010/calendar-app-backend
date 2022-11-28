const { request, response } = require("express");



const getEventos = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'Get eventos'
    });
}

const crearEventos = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'Crear eventos'
    });
}

const updateEventos = (req = request, res = response) => {
    const { id } = req.params;
    res.json({
        ok: true,
        msg: 'Update eventos',
        id
    });
}

const deleteEventos = (req = request, res = response) => {
    const { id } = req.params;
    res.json({
        ok: true,
        msg: 'Delete eventos',
        id
    });
}



module.exports = {
    getEventos,
    crearEventos,
    updateEventos,
    deleteEventos
}