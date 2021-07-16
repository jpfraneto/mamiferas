const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register route
// @access  Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, username, miracle, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists! ' }] });
      }

      user = new User({
        name: name
          .toLowerCase()
          .split(' ')
          .map(word => word[0].toUpperCase() + word.slice(1, word.length))
          .join(' '),
        email: email.toLowerCase(),
        miracle: miracle,
        username: username.toLowerCase(),
        avatar:
          'https://howtoapps.com/wp-content/uploads/2020/01/b9ed581c-cute-profile-pic-8-600x400.jpg',
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      //Create profile
      const profileFields = {};
      profileFields.user = user._id;
      profileFields.username = username.toLowerCase();
      profileFields.miracle = miracle;
      profileFields.location = '';
      profileFields.bio = '';
      profileFields.imageLink =
        'https://howtoapps.com/wp-content/uploads/2020/01/b9ed581c-cute-profile-pic-8-600x400.jpg';
      profile = new Profile(profileFields);
      await profile.save();

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
