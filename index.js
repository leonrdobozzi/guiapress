const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const articleController = require('./articles/ArticleController');
const userController = require('./user/userController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./user/User');


//View engine

app.set('view engine', 'ejs');

//Sessions

//Redis, banco de dados focado em salvamento de sessões e cache (Seŕa visto mais para frente no curso)

app.use(session({
    secret: 'popaopdkpsaodpkapsdoaspdkmasl',
    cookie:{
        maxAge: 30000000
    }
}))


//Static
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database
connection
    .authenticate()
    .then(() => {
        console.log('conexao feita com sucesso');
    }).catch(err => {
        console.log(`Aqui esta o erro: ${err}`);
    })

//ROTA COM PREFIXO => app.use('/prefixo'
app.use('/', categoriesController);
app.use('/', articleController);
app.use('/', userController);

app.get('/', (req, res) => {
    Article.findAll({
        order: [
            ['id', 'desc']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', {articles, categories});
        });
    })
});

app.get('/:slug', (req, res) => {
    let slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render('article', {article, categories});
            });
        }else{
            res.redirect('/');
        }
    }).catch( err => {
        res.redirect('/');
    })
})

app.get('/category/:slug', (req, res) => {
    let slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render('index', {articles: category.articles, categories});
            })
        }else{
            res.redirect('/');
        }
    }).catch(err => {
        res.redirect('/');
    });
});


app.listen(8080, () => {
    console.log('O servidor está rodando');
});