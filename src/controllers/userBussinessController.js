import { UserBussiness } from "../models/UserBussiness.js";

export const getUsersBusinesses = async (req, res) => {
    try {
        const businesses = await UserBussiness.findAll();
        res.status(200).json(businesses)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getUserBusiness = async (req, res) => {
    try {
        const { id } = req.params;
        const userBussiness = await UserBussiness.findByPk(id);
        if (userBussiness === null) {
            res.status(404).json({ message: "Usuario no encontrado" });
        } else {
            res.status(200).json(userBussiness);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createUserBusiness = async (req, res) => {
    const { rut, name, legalName, description, email, phone, location, password, rating } = req.body;
    try {
        const [newUserBusiness, created] = await UserBussiness.findOrCreate({ // await porque es asincrona
            where: { rut },
            defaults: {
                name,
                legalName, 
                description, 
                email, 
                phone, 
                location, 
                password, 
                rating
            }
        });
        if (created) {
            res.status(200).json(newUserBusiness)
        } else {
            res.status(409).json({ message: "Usuario ya existe" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateUserBusiness = async (req, res) => {
    try {
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
    }
}

