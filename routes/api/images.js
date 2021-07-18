const express = require('express');
const router = express.Router();
const { cloudinary } = require('../../utils/cloudinary');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Image = require('../../models/Image');
const Profile = require('../../models/Profile');
const functions = require('../../utils/functions');

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
      name: profile.name,
      title: req.body.data.title,
      alt: '',
      pregnancyDate: functions.calculateWeekFromNow(profile.miracle),
      secure_url: uploadedResponse.secure_url,
      avatar: profile.imageLink,
      text: req.body.data.text,
    });
    await newImage.save();
    profile.images.unshift(newImage);
    await profile.save();
    res.json({
      imageId: newImage._id,
      msg: 'La imagen fue agregada a tu perfil!',
    });
  } catch (error) {
    console.log('ooops, there was an error');
    res.status(500).json({ err: 'Something went wrong uploading the image' });
  }
});

// @route   PUT api/images/:id
// @desc    Update an image
// @access  Private

router.put('/:id', auth, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    const profile = await Profile.findOne({ user: req.user.id }).select(
      '-password'
    );

    image.title = req.body.data.title;
    image.text = req.body.data.text;
    image.updated = true;

    await image.save();
    const index = profile.images.indexOf(image._id);

    profile.images[index] = image;
    await profile.save();

    res.json({
      updatedImage: image,
      msg: 'La imagen fue actualizada en tu perfil!',
    });
  } catch (err) {
    console.log('Oops, the following error happened: ', err);
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
      user,
      msg: 'Tu foto de perfil fue actualizada!',
    });
  } catch (err) {
    console.log('the err is: ', err);
    res.status(500).json({ err: 'Something went wrong uploading the image' });
  }
});

// @route   POST api/images/comment/:id
// @desc    Comment on an image
// @access  Private

router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const image = await Image.findById(req.params.id);
      const profile = await Profile.findOne({ user: req.user.id });

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: profile.imageLink,
        username: profile.username,
        user: req.user.id,
      };

      image.comments.push(newComment);
      await image.save();

      res.json(image);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error!');
    }
  }
);

// @route   DELETE api/images/comment/:id/:comment_id
// @desc    Delete a comment on an image
// @access  Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    //pull out comment
    const comment = image.comments.find(
      comment => comment.id === req.params.comment_id
    );

    //Make sure comment exists
    if (!comment)
      return res.status(404).json({ msg: 'Comment does not exist' });

    //Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    //Get the remove index
    const removeIndex = image.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    image.comments.splice(removeIndex, 1);

    await image.save();

    res.json(image.comments);
  } catch (err) {
    console.log('there was an error deleting the comment', err);
    console.error(err.message);
    res.status(500).send('Server error!');
  }
});

module.exports = router;
