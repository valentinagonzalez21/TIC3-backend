import { Artist } from "../models/Artist.js";

export const getArtists = async (req, res) => {
    try {
        const users = await UserArtist.findAll();
        res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getArtist = async (req, res) => {
    try {
        const { id } = req.params;
        const artist = await Artist.findByPk(id);
        if (artist === null) {
            res.status(404).json({ message: "Usuario no encontrado" });
        } else {
            res.status(200).json(artist);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createArtist = async (req, res) => {
 /*   const { id, name, lastName, email, phone, password } = req.body;
    try {
        const [newUserArtist, created] = await UserArtist.findOrCreate({ // await porque es asincrona
            where: { id },
            defaults: {
                name,
                lastName,
                email,
                phone,
                password
            }
        });
        if (created) {
            res.status(200).json(newUserArtist)
        } else {
            res.status(409).json({ message: "Usuario ya existe" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }*/
}

export const updateArtist = async (req, res) => {
 /*   try {
        const { id } = req.params;
        const { name, lastName, email, phone, password } = req.body;

        const userArtist = await UserArtist.findByPk(id);
        userArtist.name = name;
        userArtist.lastName = lastName;
        userArtist.email = email;
        userArtist.phone = phone;
        userArtist.password = password;

        await userArtist.save();

        res.status(200).json(userArtist);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }*/


}

