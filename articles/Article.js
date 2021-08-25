const Sequelize = require("sequelize");
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        //caso o nome for node js ele muda para node-js
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//Relacionamento
Category.hasMany(Article) //Uma categorias tem muitos artigos 1-P-N (1...N)
Article.belongsTo(Category) //Um artigo pertence a uma categoria 1-P-1 (1...1)


module.exports = Article;