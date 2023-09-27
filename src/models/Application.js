import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Event } from './Event.js';
import { UserArtist } from './UserArtist.js';

export const Application = sequelize.define('application', {
    msj: {
        type: DataTypes.STRING
    },
    timestamps: false
});

Event.hasMany(Application, {
    foreignKey: 'event_id',
    sourceKey: 'id'
});
Application.belongsTo(Event, {
    foreignKey: 'event_id',
    targetId: 'id'
});

UserArtist.hasOne(Application, {
    foreignKey: 'user_id',
    sourceKey: 'id'
});
Application.belongsTo(UserArtist, {
    foreignKey: 'user_id',
    targetId: 'id'
});