import { Business } from "../models/Business.js";
import { Event } from "../models/Event.js";
import { User } from "../models/User.js";

export const getBusinesses = async (req, res) => {
    try {
        const businesses = await Business.findAll();
        res.status(200).json(businesses)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getBusiness = async (req, res) => {
    try {
        const { id } = req.params;
        const business = await Business.findByPk(id);
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
    const { rut, name, legalName, description, phone, location, email, password } = req.body;
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
                location
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
        const { name, legalName, description, phone, location, rating } = req.body;

        const business = await Business.findByPk(id);
        if (business === null) {
            res.status(404).json({ message: "Usuario no existe" });
        } else {
            business.name = name;
            business.legalName = legalName;
            business.description = description;
            business.phone = phone;
            business.location = location;
            business.rating = rating;

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
    const { name, date, genrePreffered, description, time, equipment, paid, picture, applicationDeadline, multipleDates } = req.body;

    try {
        const business = await Business.findByPk(id);
        if (business === null) {
            res.status(404).json({ message: "Negocio no encontrado" });
        } else {
            const newEvent = await Event.create({
                name,
                date,
                genrePreffered,
                description,
                time,
                equipment,
                paid,
                picture,
                applicationDeadline,
                multipleDates,
                business_rut: id
            });

            res.status(200).json(newEvent);
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}