const { request, response } = require("express");
const Evento = require('../models/evento');


const getEventos = async (req = request, res = response) => {
    const eventos = await Evento.find()
        .populate('user', 'name');
    try {
        res.json({
            ok: true,
            eventos
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con un administrado'
        });
    }
}

const crearEventos = async (req = request, res = response) => {
    const evento = new Evento(req.body);

    try {

        // Obterner el id del usuario
        evento.user = req.uid;

        const eventoDB = await evento.save();

        res.json({
            ok: true,
            evento: eventoDB
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con un administrado'
        });
    }
}

const updateEventos = async (req = request, res = response) => {
    const { id } = req.params;
    const uid= req.uid;
    try {

        const evento = await Evento.findById(id);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontro un evento con el id: ${id}`
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene los privilegios para editar este evento'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(id, newEvent, { new: true });

        res.json({
            ok: true,
            msg: 'Update eventos',
            evento: eventoActualizado
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con un administrado'
        });
    }
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