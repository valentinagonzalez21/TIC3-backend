import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Profile } from './Profile.js';

export const UserArtist = sequelize.define('user_artist', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timestamps: false
});

UserArtist.hasOne(Profile, {
    foreignKey: 'user_id',
    sourceKey: 'id'
});
Profile.belongsTo(UserArtist, {
    foreignKey: 'user_id',
    targetId: 'id'
});
    

