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
            const notificationsFilter = {};

            if (password === user.password) {
                if (type === 'artist') {
                    const artistId = user.artist_id;
                    userComplete = await Artist.findByPk(artistId);
                    notificationsFilter.artist_id = artistId;
                } else if (type === 'business') {
                    const businessId = user.business_rut;
                    userComplete = await Business.findByPk(businessId);
                    notificationsFilter.business_rut = businessId;
                }

                notificationsFilter.seen = false;
                const notifications = await Notification.findAll({
                    where: notificationsFilter,
                    order: [['createdAt', 'DESC']],
                });

                let seenNotifications = [];

                if(notifications.length < 5){
                    let remaining = 5 - notifications.length;
                    notificationsFilter.seen = true;

                    seenNotifications= await Notification.findAll({
                        where: notificationsFilter,
                        limit: remaining,
                        order: [['createdAt', 'DESC']],
                    });
                }

                res.status(200).json({ type: type, msg: "Usuario válido", user: userComplete, unseenNotifications: notifications, seenNotifications: seenNotifications });
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
