import { Event } from "../models/Event.js";
import { Business } from "../models/Business.js";
import { Artist } from "../models/Artist.js";
import { Application } from "../models/Application.js";
import { Notification } from "../models/Notification.js";
import { Op } from 'sequelize';
import {sequelize} from '../database/database.js';


export const getEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        console.log('Events retrieved successfully'); // Add this line for debugging
        const eventsWithBase64Images = events.map((event) => {
            if (event.picture) {
                // Convert the Buffer to a base64-encoded string
                //const base64Image = `data:image/jpeg;base64,${event.picture.toString('base64')}`;
                const base64Image = event.picture.toString('base64');
                // Add the base64 picture to the event
                event.picture = base64Image;
            }
            return event;
        });
        res.status(200).json(eventsWithBase64Images)
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: error.message })
    }
}

export const getEventsFiltered = async (req, res) => {
    // Si en la url business=&genre=rock , business es ""
    // Si en la url no aparece tal campo, entonces ese campo es undefined

    // 1 - Next 7 days
    // 2 - Next 30 days
    // 3 - Next 60 days

    let { neighborhood, timeWindow, business, genre } = req.query;

    const filterConditions = {};

    if (neighborhood) {
        filterConditions.neighborhood = neighborhood;
    }
    if (business) {
        try {
            const businessRUT = await Business.findOne({    // get businesses rut from name
                where: { name: business },
                attributes: ['rut']
            });
            filterConditions.business_rut = businessRUT.rut;
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
    if (genre) {
        filterConditions.genrePreffered = genre;
    }

    let date = new Date() // today
    if (timeWindow == 1) {
        date = date.setDate(date.getDate() + 6);
    } else if (timeWindow == 2) {
        date = date.setDate(date.getDate() + 29);
    } else if (timeWindow == 3) {
        date = date.setDate(date.getDate() + 59);
    }

    if (timeWindow) {
        filterConditions.date = {
            [Op.and]: {
                [Op.gte]: new Date(), // evento.date >= today
                [Op.lte]: date          // evento.date <= filtro
            }
        };
    } else {
        filterConditions.date = {
            [Op.gte]: new Date(), // evento.date >= today
        };
    }

    try {
        const events = await Event.findAll({
            where: filterConditions,
            order: [['date', 'ASC']],
        });

        res.status(200).json(events);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export const getEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByPk(id, {
            include: [{
                model: Business,
                attributes: ['name', 'webPage'],
            },
            {
                model: Artist,
                attributes: ['id', 'artisticName', 'picture']

            }]
        });
        if (event === null) {
            res.status(404).json({ message: "Evento no encontrado" });
        } else {
            res.status(200).json(event);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getEventsUnassigned = async (req, res) => {
    try {
        const events = await Event.findAll({
            where: {
                [Op.and]: [
                    { date: { [Op.gte]: new Date() } },
                    { artist_assigned_id: null }
                ]
            },
            order: [['date', 'ASC']],
            include: [{
                model: Business,
                attributes: ['name'],
            }
            ]
        });

        res.status(200).json(events);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createApplication = async (req, res) => {
    const { id } = req.params;
    const { artistId, msj } = req.body;
    try {
        // Check that application doesnt already exist
        const application = await Application.findOne({
            where: {
                [Op.and]: [
                    { event_id: id },
                    { artist_id: artistId }
                ]
            }
        });
        if (application === null) {
            const newApplication = await Application.create({
                msj,
                event_id: id,
                artist_id: artistId
            });
            res.status(200).json({ application: newApplication });
        } else {
            return res.status(409).json({ message: "Ya te has postulado para este evento" })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const assignArtistToEvent = async (req, res) => {
    const { id } = req.params;
    const { artistId } = req.body;
    try {
        const event = await Event.findByPk(id);
        event.artist_assigned_id = artistId;
        await event.save();

        const notification = await Notification.create({
            seen: false,
            msj: "Fuiste seleccionado para el evento " + event.name + "!",
            type: 'selection',
            artist_id: artistId
        });

        res.status(200).json({ event: event.id, artist: artistId });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getNeighborhoodsOfEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            //attributes: ['neighborhood'],
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('neighborhood')), 'neighborhood']], // para que no haya duplicados
        });
        res.status(200).json({ neighborhoods: events });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}