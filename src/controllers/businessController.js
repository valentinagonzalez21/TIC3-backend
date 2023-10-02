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
        const businesses = await Business.findByPk(id);
        if (businesses === null) {
            res.status(404).json({ message: "Usuario no encontrado" });
        } else {
            res.status(200).json(businesses);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createBusiness = async (req, res) => {
    /*const { rut, name, legalName, description, email, phone, location, password, rating } = req.body;
    try {
        
        const [newUser, createdUser] = await User.findOrCreate({
            where: { email },
            defaults: {
                password,
                type: 'business'
            }
        });
        if (createdUser) {
            const [newBusiness, createdBusiness] = await Business.findOrCreate({ // await porque es asincrona
                where: { rut },
                defaults: {
                    name,
                    legalName,
                    description,
                    phone,
                    location,
                    rating,
                    
                }
            });
            if (createdBusiness) {
                res.status(200).json(newBusiness)
            } else {
                res.status(409).json({ message: "Negocio ya existe" })
            }
        } else {
            res.status(409).json({ message: "Usuario ya existe" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }*/
}

export const updateBusiness = async (req, res) => {
   /* try {
        const { id } = req.params;
        const { name, legalName, description, email, phone, location, password, rating } = req.body;

        const userBusiness = await UserBussiness.findByPk(id);
        userBusiness.name = name;
        userBusiness.legalName = legalName;
        userBusiness.description = description;
        userBusiness.email = email;
        userBusiness.phone = phone;
        userBusiness.location = location;
        userBusiness.password = password;
        userBusiness.rating = rating;

        await userBusiness.save();

        res.status(200).json(userBusiness);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }*/
}

export const getEventsFromBusiness = async (req, res) => {
  /*  try {
        const { id } = req.params;

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }*/

}

export const createEventFromBusiness = async (req, res) => {
  /*  const { id } = req.params;
    const { name, date, genrePreffered, description, time, equipment, paid, picture, applicationDeadline, multipleDates } = req.body;
    
    try {
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
            bussiness_rut: id  
        });

        res.status(200).json(newEvent)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }*/
}