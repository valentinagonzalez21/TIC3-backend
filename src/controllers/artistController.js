import { Artist } from "../models/Artist.js";
import { User } from "../models/User.js";
import { Event } from "../models/Event.js";
import { Notification } from "../models/Notification.js";
import { Op } from 'sequelize';
import { Business } from "../models/Business.js";

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
        const artist = await Artist.findByPk(id, {
            include: [{
                model: User,
                attributes: ['email'],
            }
            ]
        });
        if (artist === null) {
            res.status(404).json({ message: "Usuario no encontrado" });
        } else {
            if (artist.picture) {
                artist.picture = Buffer.from(artist.picture, 'base64').toString();
                artist.picture = "data:image/png;base64," + artist.picture;
            }
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
                artisticName: name
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

export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { artisticName, picture, description, musicGenre, igUsername, links } = req.body;

        const artist = await Artist.findByPk(id);
        if (artist === null) {
            res.status(404).json({ message: "Usuario no existe" });
        } else {
            if (artisticName) {
                artist.artisticName = artisticName;
            }
            artist.picture = picture;
            artist.description = description;
            artist.musicGenre = musicGenre;
            artist.igUsername = igUsername;
            artist.links = links;

            await artist.save();

            res.status(200).json(artist);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastName, phone, password } = req.body;

        const artist = await Artist.findByPk(id, {
            attributes: ['id', 'name', 'lastName', 'phone']
        });
        const user = await User.findOne({
            where: {
                artist_id: id
            },
            attributes: ['email', 'password']
        });

        if (artist === null) {
            res.status(404).json({ message: "Usuario no existe" });
        } else {
            artist.name = name;
            artist.lastName = lastName;
            artist.phone = phone;

            if (password) {
                user.password = password;
                await user.save();
            }

            await artist.save();


            res.status(200).json(artist);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getArtistAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const artist = await Artist.findByPk(id, {
            attributes: ['id', 'name', 'lastName', 'phone'],
            include: [{
                model: User,
                attributes: ['email'],
            }
            ]
        });
        res.status(200).json(artist);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}
export const getUpcomingEventsFromArtist = async (req, res) => {
    try {
        const { id } = req.params;
        const artist = await Artist.findByPk(id);
        if (artist === null) {
            res.status(404).json({ message: "Artista no encontrado" });
        } else {
            let date = new Date() // today
            let currentDay = String(date.getDate()).padStart(2, '0');
            let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
            let currentYear = String(date.getFullYear());
            const today = currentYear + '-' + currentMonth + '-' + currentDay;

            const events = await Event.findAll({
                where: {
                    [Op.and]: [
                        { artist_assigned_id: id },
                        { date: { [Op.gte]: today } }
                    ]
                },
                order: [['date', 'ASC']], // los mas cercanos a hoy primero
                include: [{
                    model: Business,
                    attributes: ['name', 'phone'],
                    include: [{
                        model: User,
                        attributes: ['email'],
                    }],
                }],
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

export const viewNotifications = async (req, res) => {
    try {
        const { id } = req.params;
        const artist = await Artist.findByPk(id);
        if (artist === null) {
            res.status(404).json({ message: "Artista no encontrado" });
        } else {

            Notification.update(
                {
                    seen: true
                },
                {
                    where: {
                        [Op.and]: [
                            { artist_id: id },
                            { seen: false }
                        ]
                    }
                }
            )

            res.status(200).json({ msg: "Notifications vistas" });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getNotifications = async (req, res) => {
    const { id } = req.params;
    const unseenNotifications = await Notification.findAll({
        where: {
            artist_id: id,
            seen: false
        },
        order: [['createdAt', 'DESC']],
    });

    let seenNotifications = [];

    if (unseenNotifications.length < 5) {
        let remaining = 5 - unseenNotifications.length;
        seenNotifications = await Notification.findAll({
            where: {
                artist_id: id,
                seen: true
            },
            limit: remaining,
            order: [['createdAt', 'DESC']],
        });
    }
    res.status(200).json({ unseenNotifications: unseenNotifications, seenNotifications: seenNotifications });
}
