import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { User } from './User.js';


export const Business = sequelize.define('business', {
    rut: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    legalName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
    },

},
    {
        timestamps: false
    });


Business.hasOne(User, {
    foreignKey: 'business_rut',
    sourceKey: 'rut'
});
User.belongsTo(Business, {
    foreignKey: 'business_rut',
    targetId: 'rut'
});
