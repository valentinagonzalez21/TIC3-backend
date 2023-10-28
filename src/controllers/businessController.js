import { Business } from "../models/Business.js";
import { Event } from "../models/Event.js";
import { User } from "../models/User.js";
import { Application } from "../models/Application.js";
import { Artist } from "../models/Artist.js";
import { Op } from 'sequelize';

export const getBusinesses = async (req, res) => {
    try {
        const businesses = await Business.findAll();
        res.status(200).json(businesses)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getBusinessesNames = async (req, res) => {
    try {
        const businesses = await Business.findAll({
            attributes: ['name']
        });
        res.status(200).json({ businessesNames: businesses });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getBusiness = async (req, res) => {
    try {
        const { id } = req.params;
        const business = await Business.findByPk(id, {
            include: [{
                model: User,
                attributes: ['email'],
            }
            ]
        });
        if (business === null) {
            res.status(404).json({ message: "Usuario no encontrado" });
        } else {
            res.status(200).json(business);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createBusiness = async (req, res) => {
    const { rut, name, legalName, description, phone, location, webPage, email, password } = req.body;
    try {
        const user = await User.findByPk(email);
        const business = await Business.findByPk(rut);
        if (user === null && business === null) {
            const newBusiness = await Business.create({
                rut,
                name,
                legalName,
                description,
                phone,
                location,
                webPage
            });
            const newUser = await User.create({
                type: 'business',
                email,
                password,
                business_rut: rut
            })
            res.status(200).json({ user: newBusiness });
        } else {
            res.status(409).json({ message: "Usuario ya existe" });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateBusiness = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, legalName, description, phone, location, rating, webPage, password } = req.body;

        const business = await Business.findByPk(id);
        const user = await User.findOne({
            where: {
                business_rut: id
            },
            attributes: ['email', 'password']
        });

        if (business === null) {
            res.status(404).json({ message: "Usuario no existe" });
        } else {
            business.name = name;
            business.legalName = legalName;
            business.description = description;
            business.phone = phone;
            business.location = location;
            business.rating = rating;
            business.webPage = webPage;

            if (password) {
                user.password = password;
                await user.save();
            }

            await business.save();

            res.status(200).json(business);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getEventsFromBusiness = async (req, res) => {
    try {
        const { id } = req.params;
        const business = await Business.findByPk(id);
        if (business === null) {
            res.status(404).json({ message: "Negocio no encontrado" });
        } else {
            const events = await Event.findAll({
                where: {
                    business_rut: id
                }
            });
            res.status(200).json({ events: events });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const createEventFromBusiness = async (req, res) => {
    const { id } = req.params;
    const { name, date, genrePreffered, description, time, equipment, paid, picture, location, neighborhood } = req.body;

    try {
        const business = await Business.findByPk(id);
        if (business === null) {
            res.status(404).json({ message: "Negocio no encontrado" });
        } else {
            console.log('estoy aca');
            //picture.slice(22)
            const newEvent = await Event.create({
                name,
                date,
                genrePreffered,
                description,
                time,
                equipment,
                paid,
                picture,
                location,
                neighborhood,
                business_rut: id
            });

            res.status(200).json(newEvent);
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getUpcomingEventsFromBusiness = async (req, res) => {
    try {
        const { id } = req.params;
        const business = await Business.findByPk(id);
        if (business === null) {
            res.status(404).json({ message: "Negocio no encontrado" });
        } else {
            let date = new Date() // today
            let currentDay = String(date.getDate()).padStart(2, '0');
            let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
            let currentYear = String(date.getFullYear());
            const today = currentYear + '-' + currentMonth + '-' + currentDay;

            const events = await Event.findAll({
                where: {
                    [Op.and]: [
                        { business_rut: id },
                        { date: { [Op.gte]: today } },
                        { artist_assigned_id: { [Op.not]: null } }
                    ]
                },
                order: [['date', 'ASC']], // los mas cercanos a hoy primero
                include: [{
                    model: Artist,
                    attributes: ['name', 'artisticName', 'phone'],
                    include: [{
                        model: User,
                        attributes: ['email']
                    }]
                }
                ]
            });
            res.status(200).json(events);
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getUnassignedEventsFromBusiness = async (req, res) => {
    try {
        const { id } = req.params;
        const business = await Business.findByPk(id);
        if (business === null) {
            res.status(404).json({ message: "Negocio no encontrado" });
        } else {
            const events = await Event.findAll({
                where: {
                    [Op.and]: [
                        { business_rut: id },
                        { date: { [Op.gte]: new Date() } },
                        { artist_assigned_id: null }
                    ]
                },
                order: [['date', 'ASC']],
                include: [{
                    model: Application,
                    include: [{
                        model: Artist,
                        attributes: ['id', 'artisticName'],
                    }]
                }
                ]
            });

            const eventsWithBase64Images = events.map((event) => {
                if (event.picture) {
                    event.picture = Buffer.from(event.picture, 'base64').toString();
                    event.picture = "data:image/png;base64," + event.picture;
                } 
                return event;
            });

            res.status(200).json(eventsWithBase64Images);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
