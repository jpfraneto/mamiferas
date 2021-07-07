const express = require('express');
const router = express.Router();
const { cloudinary } = require('../../utils/cloudinary');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Image = require('../../models/Image');
const Profile = require('../../models/Profile');

// @route   POST api/images
// @desc    Create a post
// @access  Private

router.get('/', async (req, res) => {
  const { resources } = await cloudinary.search
    .expression('resource_type:image')
    .sort_by('public_id', 'desc')
    .execute();
  const publicIds = resources.map(file => file.public_id);
  console.log('The public ids are:');
  res.json(publicIds);
});

router.get('/user/:id', async (req, res) => {
  const profile = await Profile.findById(req.params.id).populate('images');
  console.log('the profile with the images populated is:', profile);
  res.json(profile.images);
});

router.get('/:id', async (req, res) => {
  const image = await Image.findById(req.params.id);
  console.log('the found image is', image);
  res.json(image);
});

router.post('/', auth, async (req, res) => {
  try {
    const uploadedResponse = await cloudinary.uploader.upload(
      req.body.data.previewSource
    );
    const profile = await Profile.findOne({ user: req.user.id }).select(
      '-password'
    );
    const newImage = new Image({
      username: req.user.id,
      title: req.body.data.title,
      alt: '',
      secure_url: uploadedResponse.secure_url,
      text: req.body.data.text,
    });
    await newImage.save();
    profile.images.unshift(newImage);
    await profile.save();
    res.json({ msg: 'The image was uploaded and added to your profile!' });
  } catch (error) {
    console.log('ooops, there was an error');
    res.status(500).json({ err: 'Something went wrong uploading the image' });
  }
});

router.post('/update-profile-picture', auth, async (req, res) => {
  try {
    console.log('inside here, the req.body is:', req.body);
    const uploadedResponse = await cloudinary.uploader.upload(
      req.body.previewSource
    );
    const profile = await Profile.findOne({ user: req.user.id }).select(
      '-password'
    );
    profile.imageLink = uploadedResponse.secure_url;
    profile.save();
    res.json({
      msg: 'Tu foto de perfil fue actualizada!',
    });
  } catch (err) {
    res.status(500).json({ err: 'Something went wrong uploading the image' });
  }
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
