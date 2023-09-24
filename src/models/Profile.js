import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Profile = sequelize.define('profile', {
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
        type: DataTypes.STRING
    },
    igUsername: {
        type: DataTypes.STRING
    },
    links: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.INTEGER
    }
})
    

