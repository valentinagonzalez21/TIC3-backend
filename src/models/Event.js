import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { UserBussiness } from './UserBussiness.js';
import { UserArtist } from './UserArtist.js';

export const Event = sequelize.define('event', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.ARRAY(DataTypes.DATEONLY), // ver como funciona esto bien
        allowNull: false
    },
    genrePreffered: {
        type: DataTypes.ENUM('pop', 'rock', 'jazz', 'clásic', 'alternativo', 'indie', 'cumbia', 'rap/trap','otro') //hay que ver como generalizar esto
    },
    description: {
        type: DataTypes.STRING
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    equipment: {
        type: DataTypes.STRING
    },
    paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING
    },
    applicationDeadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    multipleDates: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    timestamps: false
});

UserBussiness.hasMany(Event, {
    foreignKey: 'bussiness_rut',
    sourceKey: 'rut'
});
Event.belongsTo(UserBussiness, {
    foreignKey: 'bussiness_rut',
    targetId: 'rut'
});

UserArtist.hasMany(Event, {
    foreignKey: 'artist_assigned_id',
    sourceKey: 'id'
});
Event.belongsTo(UserArtist, {
    foreignKey: 'artist_assigned_id',
    targetId: 'id'
});