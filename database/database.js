const Sequelize = require('sequelize');

const connection = new Sequelize('guiapress', '<USER_BANCO>', '<SENHA_BANCO>', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;
