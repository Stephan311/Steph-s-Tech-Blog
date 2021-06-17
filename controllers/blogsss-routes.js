const router = require('express').Router();
//const { Gallery, Painting } = require('../models');
const { Blog } = require('../models');

// GET all productss for productpage

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
  res.render('owner');
});
// Add product route
router.get('/add', (req, res) => {
  //if (req.session.loggedIn) {
    // res.redirect('/');
   // return;
  //}
  res.render('product',{loggedIn: req.session.loggedIn,
    
   });
  
});

// GET one Product
router.get('/:id', async (req, res) => {
  if(req.params.id==="add"){
    res.render('product');
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
    res.render('product', { product, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE new product
router.post('/', async (req, res) => {
    try {
      const dbProductData = await Product.create({
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
      });
  
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.isOwner = true;
        //res.redirect('/products'); to redirect to prodcut listing page
        //return;

        res.status(200).json(dbProductData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// update product
router.put('/:id', async(req, res) => {
    // update a product by its `id` value
    try {
      const productData = await Product.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!productData[0]) {
        res.status(404).json({ message: 'No product with this id!' });
        return;
      }
      //res.redirect('/products'); to redirect to prodcut listing page
        //return;
      res.status(200).json(productData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.delete('/:id', async (req, res) => {
    try {
      const productData = await Product.destroy({
        where: {
          id: req.params.id,
         // user_id: req.session.user_id,
        },
      });
  
      if (!productData) {
        res.status(404).json({ message: 'No product found with this id!' });
        return;
      }
      //res.redirect('/products'); to redirect to prodcut listing page
        //return;

      res.status(200).json(productData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  

module.exports = router;