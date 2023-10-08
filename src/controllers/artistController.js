import { Artist } from "../models/Artist.js";
import { User } from "../models/User.js"

export const getArtists = async (req, res) => {
    try {
        const artists = await Artist.findAll();
        console.log(artists);
        res.status(200).json(artists)
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
    const { id, name, lastName, email, phone, password } = req.body;
    try {
        const user = await User.findByPk(email);
        const artist = await Artist.findByPk(id);
        if (user === null && artist === null) {
            const newArtist = await Artist.create({
                id,
                name,
                lastName,
                phone,
            });
            const newUser = await User.create({
                type: 'artist',
                email,
                password,
                artist_id: id
            })
            res.status(200).json({ user: newArtist });
        } else {
            res.status(409).json({ message: "Usuario ya existe" });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateArtist = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastName, phone, artisticName, picture, description, musicGenre, igUsername, links, rating } = req.body;

        const artist = await Artist.findByPk(id);
        if (artist === null) {
            res.status(404).json({ message: "Usuario no existe" });
        } else {
            artist.name = name;
            artist.lastName = lastName;
            artist.phone = phone;
            artist.artisticName = artisticName;
            artist.picture = picture;
            artist.description = description;
            artist.musicGenre = musicGenre;
            artist.igUsername = igUsername;
            artist.links = links;
            artist.rating = rating;

            await artist.save();

            res.status(200).json(artist);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}

