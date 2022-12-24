const { response } = require('express');
const Event = require('../models/Event');


const getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events
    });
}

const createEvent = async (req, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;

        const eventSave = await event.save();

        res.status(200).json({
            ok: true,
            event: eventSave
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
}

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }
        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to edit this event'
            });
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })
        res.status(200).json({
            ok: true,
            event: eventUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }


}


const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }
        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to delete this event'
            });
        }

        const eventDeleted = await Event.findByIdAndDelete(eventId);

        res.status(200).json({
            ok: true,
            event: eventDeleted
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
