const express = require('express');
const router = express.Router();
const { cloudinary } = require('../../utils/cloudinary');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Image = require('../../models/Image');
const Profile = require('../../models/Profile');

// @route   GET api/images
// @desc    Get all images
// @access  Private

router.get('/', async (req, res) => {
  try {
    const globalImages = await Image.find({});
    res.json({ globalImages });
  } catch (err) {
    res.status(500).json({ err: 'Something went wrong getting the images' });
  }
});

// @route   GET api/images/user/:id
// @desc    Get user images
// @access  Private

router.get('/user/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate('images');
    res.json(profile.images);
  } catch (err) {
    res
      .status(500)
      .json({ err: 'Something went wrong getting the images for this user' });
  }
});

// @route   GET api/images/:id
// @desc    Get image information
// @access  Private

router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    res.json(image);
  } catch (err) {
    res
      .status(500)
      .json({ err: 'Something went wrong getting the image by id' });
  }
});

// @route   POST api/images
// @desc    Upload image and add it to the profile of the user that is logged in
// @access  Private

router.post('/', auth, async (req, res) => {
  try {
    const uploadedResponse = await cloudinary.uploader.upload(
      req.body.data.previewSource,
      {
        upload_preset: 'mamiferas_media',
      }
    );
    const profile = await Profile.findOne({ user: req.user.id }).select(
      '-password'
    );
    const newImage = new Image({
      username: profile.username,
      title: req.body.data.title,
      alt: '',
      secure_url: uploadedResponse.secure_url,
      text: req.body.data.text,
    });
    await newImage.save();
    profile.images.unshift(newImage);
    await profile.save();
    res.json({ msg: 'La imagen fue agregada a tu perfil!' });
  } catch (error) {
    console.log('ooops, there was an error');
    res.status(500).json({ err: 'Something went wrong uploading the image' });
  }
});

// @route   POST api/images/update-profile-picture
// @desc    Upload the profile picture of the logged in user
// @access  Private

router.post('/update-profile-picture', auth, async (req, res) => {
  try {
    const uploadedResponse = await cloudinary.uploader.upload(
      req.body.previewSource,
      {
        upload_preset: 'mamiferas_pp',
      }
    );
    const profile = await Profile.findOne({ user: req.user.id }).select(
      '-password'
    );
    const user = await User.findById(req.user.id).select('-password');
    user.avatar = uploadedResponse.secure_url;
    user.save();
    profile.imageLink = uploadedResponse.secure_url;
    profile.save();
    res.json({
      msg: 'Tu foto de perfil fue actualizada!',
    });
  } catch (err) {
    console.log('the err is: ', err);
    res.status(500).json({ err: 'Something went wrong uploading the image' });
  }
});

module.exports = router;
