import Sequelize from 'sequelize';
import { dBName, user, password, host } from '../config/config.js';

const sequelize = new Sequelize(dBName, user, password, {
    host: host,
    dialect: 'postgres'
});

export {sequelize};