import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const User = sequelize.define('user', {
    email: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('artist', 'business'),
        allowNull: false
    }
},
    {
        timestamps: false
    });


