const router = require('express').Router();

const apiRoutes = require('./api');
const blogRoutes = require('./blog-routes');
// const businessOwnerRoutes = require('./admin-routes');
// const productRoutes = require('./product-routes');

// //router.use('/login', homeRoutes);

module.exports = router;
////add Date to profit table
///make a new table with product_id, id, profit_id, price, quantity, date.