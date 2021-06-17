const router = require('express').Router();

const apiRoutes = require('./api');
const blogOwnerRoutes = require('./blogsss-routes');
const blogRoutes = require('./blog-routes');
const userlistroutes = require('./userlist-routes');


router.use('/', blogRoutes);
router.use('/api', apiRoutes);
router.use('/blog',blogOwnerRoutes)
router.use('/userlist', userlistroutes);

module.exports = router;
