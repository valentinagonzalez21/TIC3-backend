import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Profile = sequelize.define('profile', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    artisticName: {
        type: DataTypes.STRING,
    },
    picture: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    musicGenre: {
        type: DataTypes.ENUM('pop', 'rock', 'jazz', 'clásic', 'alternativo', 'indie', 'cumbia', 'rap/trap', 'otro') //hay que ver como generalizar esto
    },
    igUsername: {
        type: DataTypes.STRING
    },
    links: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.INTEGER
    },

},
    {
        timestamps: false
    })


