import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Event } from './Event.js';
import { Artist } from './Artist.js';

export const Application = sequelize.define('application', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    msj: {
        type: DataTypes.STRING
    },
},
    {
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

Artist.hasOne(Application, {
    foreignKey: 'artist_id',
    sourceKey: 'id'
});
Application.belongsTo(Artist, {
    foreignKey: 'artist_id',
    targetId: 'id'
});