const router = require('express').Router();
const {User} = require('../models');

//load profit data, make sure it has same properties
// Login route


router.get('/', async(req, res) => {
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


module.exports = router;