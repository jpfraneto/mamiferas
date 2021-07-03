const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Image = require('../../models/Image');
const Profile = require('../../models/Profile');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @route   POST api/images
// @desc    Create a post
// @access  Private

router.get('/', (req, res) => {
  console.log(cloudinary.url('sample'));
  console.log('acá van a estar todas las imagenes!');
  //Buscar en la DB las imágenes para mostrarlas en el front end
  const images = [
    {
      name: 'imagen1',
      alt: 'altImagen1',
      url: 'https://i.blogs.es/36d509/adorable-baby-bed-1556706/1366_2000.jpg',
    },
    {
      name: 'imagen1',
      alt: 'altImagen1',
      url: 'https://i.blogs.es/2429b7/bebe-dormido/150_150.jpg',
    },
    {
      name: 'imagen1',
      alt: 'altImagen1',
      url: 'https://i.blogs.es/6b0a8c/pexels-photo-62272/150_150.jpeg',
    },
  ];
  res.json(images);
});

router.post('/', (req, res) => {
  console.log('wena compare! acá estamos');
  console.log(req.body);
  res.json({ 1: 'wena', 2: 'compare' });
});

// router.post(
//   '/',
//   [auth, [check('text', 'Text is required').not().isEmpty()]],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const user = await User.findById(req.user.id).select('-password');

//       const newPost = new Post({
//         text: req.body.text,
//         name: user.name,
//         avatar: user.avatar,
//         user: req.user.id,
//       });

//       const post = await newPost.save();

//       res.json(post);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error!');
//     }
//   }
// );

module.exports = router;
