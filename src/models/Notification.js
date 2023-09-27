import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { UserBussiness } from './UserBussiness.js';
import { UserArtist } from './UserArtist.js';

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

UserBussiness.hasMany(Notification, {
    foreignKey: 'bussiness_rut',
    sourceKey: 'rut'
});
Notification.belongsTo(UserBussiness, {
    foreignKey: 'bussiness_rut',
    targetId: 'rut'
});

UserArtist.hasMany(Notification, {
    foreignKey: 'user_id',
    sourceKey: 'id'
});
Notification.belongsTo(UserArtist, {
    foreignKey: 'user_id',
    targetId: 'id'
});