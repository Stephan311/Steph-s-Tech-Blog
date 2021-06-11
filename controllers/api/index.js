const router = require('express').Router();

const loginRoutes = require('./login-routes');
// const dashboardRoutes = require('../dashboard-routes');
// const productpurchaseroutes = require('../product-purchases-routes')
// const userlistroutes = require('./userlist-routes');

router.use('/login', loginRoutes);
// router.use('/productstats', productpurchaseroutes);



module.exports = router;
