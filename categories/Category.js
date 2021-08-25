const Sequelize = require("sequelize");
const connection = require('../database/database');

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        //caso o nome for node js ele muda para node-js
        type: Sequelize.STRING,
        allowNull: false
    }
});


module.exports = Category;