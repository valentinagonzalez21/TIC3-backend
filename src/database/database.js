import Sequelize from 'sequelize';

const sequelize = new Sequelize('tic3', 'postgres', 'contrasena', {
    host:'localhost',
    dialect: 'postgres'
});

export {sequelize};