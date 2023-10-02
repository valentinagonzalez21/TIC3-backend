import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Business } from './Business.js';
import { Artist } from './Artist.js';

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
        type: DataTypes.ENUM('pop', 'rock', 'jazz', 'clásic', 'alternativo', 'indie', 'cumbia', 'rap/trap', 'otro') //hay que ver como generalizar esto
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

},
    {
        timestamps: false
    });

Business.hasMany(Event, {
    foreignKey: 'bussiness_rut',
    sourceKey: 'rut'
});
Event.belongsTo(Business, {
    foreignKey: 'bussiness_rut',
    targetId: 'rut'
});

Artist.hasMany(Event, {
    foreignKey: 'artist_assigned_id',
    sourceKey: 'id'
});
Event.belongsTo(Artist, {
    foreignKey: 'artist_assigned_id',
    targetId: 'id'
});