const router = require('express').Router();
//const { Gallery, Painting } = require('../models');
const { Blog } = require('../models');


router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      /*include: [
        {
          model: Painting,
          attributes: ['filename', 'description'],
        },
      ],*/
    });

    const blogs = dbBlogData.map((Blog) =>
      Blog.get({ plain: true })
    );
    res.render('blog-list', {
      blogs,
      loggedIn: req.session.loggedIn,
       


    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// Login route
router.get('/login', (req, res) => {
  
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('addblog');
});

router.get('/add', (req, res) => {

  res.render('addblog',{loggedIn: req.session.loggedIn,
    
   });
  
});


// CREATE new Blog
router.post('/', async (req, res) => {
    try {
      const dbBlogData = await Blog.create({
        title: req.body.title,
        body: req.body.body,
        author:req.body.author,
      });
  
      req.session.save(() => {
        req.session.loggedIn = true;
      

        res.status(200).json(dbBlogData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id!' });
        return;
      }
      

      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/blogstats', async(req, res) => {
    try {
      const dbBlogData = await Blog.findAll({
      });
  
      const blog = dbBlogData.map((Blog) =>
      Blog.get({plain: true})
      );
  
      console.log(blog);
      res.render('blogstats', {
        blog,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err) 
        res.status(500).json(err)
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const dbBlogData = await Blog.findByPk(req.params.id);
      const blog = dbBlogData.get({ plain: true });
      res.render('blog', { blog, loggedIn: req.session.loggedIn});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.put('/:id', async(req, res) => {
 
    try {
      const BlogData = await Blog.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!BlogData[0]) {
        res.status(404).json({ message: 'No blog with this id!' });
        return;
      }
     
      res.status(200).json(BlogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const BlogData = await Blog.destroy({
        where: {
          id: req.params.id,
         // user_id: req.session.user_id,
        },
      });
  
      if (!BlogData) {
        res.status(404).json({ message: 'No Blog found with this id!' });
        return;
      }

  
      res.status(200).json(BlogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  

module.exports = router;