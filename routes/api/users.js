const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailgun = require('mailgun-js');
const DOMAIN = 'sandbox4f8799851e8d49799825f02ec8411dc7.mailgun.org';
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route   POST api/users/register-check
// @desc    Check if username or email are already in use
// @access  Public

router.post('/register-check', async (req, res) => {
  try {
    const validation = { email: false, username: false };
    const userByEmail = await User.findOne({ email: req.body.email.trim() });
    const userByUsername = await User.findOne({
      username: req.body.username.trim(),
    });
    if (userByEmail) validation.email = true;
    if (userByUsername) validation.username = true;
    res.json(validation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

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
    const { name, email, username, miracle, password, parentIdentificator } =
      req.body;
    try {
      let user = await User.findOne({ username });
      let user2 = await User.findOne({ email });

      if (user || user2) {
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
        parentIdentificator,
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
      profileFields.name = user.name;
      profileFields.parentIdentificator = user.parentIdentificator;
      profileFields.user = user._id;
      profileFields.username = username.toLowerCase();
      profileFields.miracle = miracle;
      profileFields.location = '';
      profileFields.bio = '';
      profileFields.imageLink =
        'https://howtoapps.com/wp-content/uploads/2020/01/b9ed581c-cute-profile-pic-8-600x400.jpg';
      profile = new Profile(profileFields);
      await profile.save();
      user.password = '';

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

// @route   GET api/users/password-recovery/verify-email
// @desc    Check if token is related to email
// @access  Public
router.post('/password-recovery/verify-email', async (req, res) => {
  try {
    const { email, token } = req.body;
    const user = await User.findOne({ email }).select('resetToken');
    if (!user) {
      return res.json({
        msg: 'No existe un usuario con ese mail asociado, por favor intenta nuevamente',
        correctEmail: false,
      });
    }
    if (user.resetToken === token) {
      return res.json({
        msg: 'El código corresponde al mail',
        correctEmail: true,
      });
    }
    return res.json({
      msg: 'El código no le corresponde a este correo, por favor intenta nuevamente',
      correctEmail: false,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/password-recovery/new-password
// @desc    Update the user with the new password
// @access  Public
router.post('/password-recovery/new-password', async (req, res) => {
  try {
    const { email, token, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: 'No existe un usuario con este mail asociado.' });
    }
    if (user.resetToken !== token) {
      return res.json({
        msg: 'El token no es válido para este usuario',
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);
    user.resetToken = '';
    user.save();
    res.json({ msg: 'Tu clave fue actualizada', success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/password-recovery/:token
// @desc    Recover password route
// @access  Public

router.post('/password-recovery/:token', async (req, res) => {
  try {
    const { email, token } = req.body;
    if (token) {
      const tokenResponse = await jwt.verify(
        token,
        process.env.RESET_PASSWORD_KEY
      );
      if (tokenResponse.email === email) {
        return res.json({
          msg: 'Success, please add a new password',
          success: true,
          email,
        });
      }
    }
    return res.json({ msg: 'There was a problem', success: false });
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Passoword reset link error');
  }
});

// @route   POST api/users/password-recovery
// @desc    Recover password route (generate a link for retrieving the password);
// @access  Public

router.post('/password-recovery', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(400)
      .json({ error: 'No existe un usuario con este mail asociado.' });
  try {
    const token = await jwt.sign(
      { _id: user._id, email },
      process.env.RESET_PASSWORD_KEY,
      {
        expiresIn: 360000,
      }
    );
    const resetUrl = process.env.CLIENT_URL + '/password-recovery/' + token;
    const data = {
      from: 'noreply@mamiferas.org',
      to: email,
      subject: 'Recupera tu contraseña de Mamíferas',
      html:
        `<h3>Hola ${user.name}! Recibimos tu solicitud para recuperar tu contraseña.</h3><br/><p>Para crear una nueva, haz click <a href='` +
        resetUrl +
        "'><span>acá</span></a>.</p><br/><p>Muchas gracias por confiar en este proyecto, cualquier comentario por favor escríbeme a jpfraneto@gmail.com. Saludos grandes.</p>",
    };
    user.resetToken = token;
    await user.save();
    mg.messages().send(data, function (error, body) {
      console.log('The email was sent, the body of the callback is: ', body);
    });
    res.json({
      msg: 'El correo con el link para crear una nueva clave fue enviado exitosamente. Por favor revisa tu correo y sigue las instrucciones.',
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Passoword reset link error');
  }
});

module.exports = router;
