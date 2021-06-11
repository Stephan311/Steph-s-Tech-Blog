const router = require('express').Router();
const sequelize = require('../config/connection');
const {Blog} = require('../models');
const {User} = require('../models');

//load profit data, make sure it has same properties
// Login route


router.get('/', async(req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      include: [{model: User}]
    });
      
    const blogs = dbBlogData.map((Blog) =>
    Blog.get({plain: true})
    );

    console.log(blogs);
    // res.render('dashboard', {
    //   blogs,
    //   loggedIn: req.session.loggedIn,
    // });
  } catch (err) {
    console.log(err) 
      res.status(500).json(err)
  }
});


module.exports = router;