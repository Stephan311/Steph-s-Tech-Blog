const router = require('express').Router();
const sequelize = require('../config/connection');
const {Blog} = require('../models');


//load profit data, make sure it has same properties
// Login route


router.get('/', async(req, res) => {
  console.log('hello')
  try {
    const dbBlogData = await Blog.findAll();
      
    const blogs = dbBlogData.map((blog) =>
     blog.get({plain: true})
    );

    console.log(blogs);
    res.render('blog', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err) 
      res.status(500).json(err)
  }
});


module.exports = router;