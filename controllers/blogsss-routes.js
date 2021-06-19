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
// Add product route
router.get('/add', (req, res) => {
  //if (req.session.loggedIn) {
    // res.redirect('/');
   // return;
  //}
  res.render('addblog',{loggedIn: req.session.loggedIn,
    
   });
  
});

// GET one Product
router.get('/:id', async (req, res) => {
  if(req.params.id==="add"){
    res.render('addblog');
    return;
  }
  try {
    const dbProductData = await Product.findByPk(req.params.id, {
     /* include: [
        {
          model: Painting,
          attributes: [
            'id',
            'title',
            'artist',
            'exhibition_date',
            'filename',
            'description',
          ],
        },
      ],*/
    });

    const product = dbProductData.get({ plain: true });
    res.render('addblog', { product, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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

// // update product
// router.put('/:id', async(req, res) => {
//     // update a product by its `id` value
//     try {
//       const productData = await Product.update(req.body, {
//         where: {
//           id: req.params.id,
//         },
//       });
//       if (!productData[0]) {
//         res.status(404).json({ message: 'No product with this id!' });
//         return;
//       }
//       //res.redirect('/products'); to redirect to prodcut listing page
//         //return;
//       res.status(200).json(productData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// router.delete('/:id', async (req, res) => {
//     try {
//       const productData = await Product.destroy({
//         where: {
//           id: req.params.id,
//          // user_id: req.session.user_id,
//         },
//       });
  
//       if (!productData) {
//         res.status(404).json({ message: 'No product found with this id!' });
//         return;
//       }
//       //res.redirect('/products'); to redirect to prodcut listing page
//         //return;

//       res.status(200).json(productData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

  

module.exports = router;