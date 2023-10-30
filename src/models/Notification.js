import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Business } from './Business.js';
import { Artist } from './Artist.js';

export const Notification = sequelize.define('notification', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    seen: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    msj: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    },

},
    {
        timestamps: false
    });

Business.hasMany(Notification, {
    foreignKey: 'business_rut',
    sourceKey: 'rut'
});
Notification.belongsTo(Business, {
    foreignKey: 'business_rut',
    targetId: 'rut'
});

Artist.hasMany(Notification, {
    foreignKey: 'artist_id',
    sourceKey: 'id'
});
Notification.belongsTo(Artist, {
    foreignKey: 'artist_id',
    targetId: 'id'
});