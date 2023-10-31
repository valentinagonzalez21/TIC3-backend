import { Artist } from "../models/Artist.js";
import { Business } from "../models/Business.js";
import { User } from "../models/User.js";
import { Notification } from "../models/Notification.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByPk(email);

        if (user !== null) {
            const type = user.type;
            let userComplete;

            if (password === user.password) {
                if (type === 'artist') {
                    const artistId = user.artist_id;
                    userComplete = await Artist.findByPk(artistId);
                } else if (type === 'business') {
                    const businessId = user.business_rut;
                    userComplete = await Business.findByPk(businessId);
                }

                res.status(200).json({ type: type, msg: "Usuario válido", user: userComplete});
            } else {
                res.status(200).json({ type: null, msg: "Contraseña incorrecta" });
            }
        } else {
            res.status(200).json({ type: null, message: 'Usuario o contraseña incorrecta' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
