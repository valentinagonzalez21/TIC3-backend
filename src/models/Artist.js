import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { User } from './User.js';

export const Artist = sequelize.define('artist', {
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
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    artisticName: {
        type: DataTypes.STRING,
    },
    picture: {
        type: DataTypes.BLOB
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
    }
},
    {
        timestamps: false
    });

Artist.hasOne(User, {
    foreignKey: 'artist_id',
    sourceKey: 'id'
});
User.belongsTo(Artist, {
    foreignKey: 'artist_id',
    targetId: 'id'
});

