const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars')
const hbs = exphbs.create({});
const path = require('path')
// const routes = require('./api');
// import sequelize connection


const app = express();
const PORT = process.env.PORT || 3005;

//create handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controller/blog-routes'));

// app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => {
app.listen(PORT, () => console.log('now listening'));
});
