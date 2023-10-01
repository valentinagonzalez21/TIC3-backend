import { UserArtist } from "../models/UserArtist.js";
import { UserBussiness } from "../models/UserBussiness.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserArtist.findOne({
            where: {email: email}
        });
        if(user !== null){
            res.status(200).json({type: "artist", user: user});
        } else {
            const user = await UserBussiness.findOne({
                where: {email: email}
            });
            if(user !== null){
                res.status(200).json({type: "business", user: user});
            } else{
                res.status(200).json({type: null, message: 'Usuario o contraseña incorrecta'}); 
                // la request en sí estuvo bien por lo que se tiene que devolver un 200
            }

        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
