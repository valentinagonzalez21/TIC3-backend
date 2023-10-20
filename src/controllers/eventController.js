import { Event } from "../models/Event.js";
import { Business } from "../models/Business.js";
import { Artist } from "../models/Artist.js";
import { Op } from 'sequelize';

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
                attributes: ['name'],
            },
            {
                model: Artist,
                attributes: ['id', 'artisticName']

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
                    {date: {[Op.gte]: new Date()}},
                    {artist_assigned_id: null}
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