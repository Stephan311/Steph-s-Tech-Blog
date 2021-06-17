const router = require('express').Router();
const { Owner } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbOwnerData = await Owner.create({
      username: req.body.username,
      email: req.body.email,
      busname: req.body.busname,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.isOwner = true;

      

      res.status(200).json(dbOwnerData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbOwnerData = await Owner.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbOwnerData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = dbOwnerData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.isOwner = true;

      res
        .status(200)
        .json({ owner: dbOwnerData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn && req.session.isOwner) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
