const router = require('express').Router();
//const { Gallery, Painting } = require('../models');
const  { User } = require('../models');
const { Blog} = require('../models')



router.get('/', async (req, res) => {
  console.log(User)

   const usa = await User.findAll(
   )
   console.log(usa)



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
      isOwner: req.session.isOwner
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
  res.render('login');
});

// router.get('/login', (req, res) => {
  
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }
//   res.render('owner');
// });

router.get('/add', (req, res) => {
  //if (req.session.loggedIn) {
    // res.redirect('/');
   // return;
  //}
  res.render('addblog',{loggedIn: req.session.loggedIn, isOwner: req.session.isOwner });
});

router.get('/userlist', async(req, res) => {
  console.log('USERLIST ROUTES BEING HIT')
  try {
    const dbUserData = await User.findAll({
    });

    const users = dbUserData.map((User) =>
    User.get({plain: true})
    );

    console.log(users);
    res.render('users', {
      users,
      loggedIn: req.session.loggedIn,
      isOwner: req.session.isOwner
    });
  } catch (err) {
    console.log(err) 
      // res.status(500).json(err)
  }
});

// CREATE new blog
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

router.get('/add', (req, res) => {
  //if (req.session.loggedIn) {
    // res.redirect('/');
   // return;
  //}
  res.render('addblog',{loggedIn: req.session.loggedIn });
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
    const BlogData = await Blog.findByPk(req.params.id);
    const blog = BlogData.get({ plain: true });
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

//if statment to differ owner from user 
//