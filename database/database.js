const Sequelize = require('sequelize');

const connection = new Sequelize('guiapress', 'leonardobozzi', '64171012', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;