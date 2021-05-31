const express = require('express');
const sequelize = require('./config/connection');
// const routes = require('./routes');
// import sequelize connection

const Product = require('./models/Product');
const Profits = require('./models/Profits');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => {
app.listen(PORT, () => console.log('now listening'));
});
