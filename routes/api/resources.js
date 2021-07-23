const express = require('express');
const router = express.Router();
const { cloudinary } = require('../../utils/cloudinary');
const auth = require('../../middleware/auth');
const auth2 = require('../../middleware/auth2');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Image = require('../../models/Image');
const Resource = require('../../models/Resource');
const Profile = require('../../models/Profile');
const functions = require('../../utils/functions');

// @route   GET api/resources
// @desc    GET all resources
// @access  Private

router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find({});
    res.json(resources);
  } catch (err) {
    console.log('the error is', err);
    res.status(500).json({
      err: `There was an error retrieving the resources`,
    });
  }
});

// @route   GET api/resources/resource/:id
// @desc    GET resource by id
// @access  Private
router.get('/resource/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    res.json(resource);
  } catch (err) {
    res.status(500).json({
      err: `There was an error retrieving the resource ${req.params.id}`,
    });
  }
});

// @route   GET api/resources/resource/:id/add-like
// @desc    GET and add like to the resource
// @access  Public
router.get('/resource/:id/add-like', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    resource.likes = [...resource.likes, 'like'];
    await resource.save();
    res.json({
      resource,
      msg: `The resource was liked, and it now has ${resource.likes.length} likes`,
    });
  } catch (err) {
    console.log('the error is', err);
    res.status(500).json({
      err: `There was an error retrieving the resources from the category ${req.params.category}`,
    });
  }
});

// @route   GET api/resources/:category
// @desc    GET all resources by category
// @access  Public
router.get('/:category', async (req, res) => {
  try {
    const resources = await Resource.find({
      category: req.params.category.toLowerCase(),
    }).sort([['date', -1]]);
    res.json({ resources });
  } catch (err) {
    console.log('the error is', err);
    res.status(500).json({
      err: `There was an error retrieving the resources from the category ${req.params.category}`,
    });
  }
});

// @route   POST api/resources
// @desc    Create a resource
// @access  Private

router.post('/', auth2, async (req, res) => {
  try {
    const { category, addedBy, description, url, mediaType, title } = req.body;
    const newResource = new Resource({
      category,
      addedBy,
      description,
      url,
      mediaType,
      title,
    });
    console.log('the new resource is: ', newResource);
    await newResource.save();

    res.json({
      msg: 'The resource was saved to the DB',
      newResource,
    });
  } catch (err) {
    res
      .status(500)
      .json({ err: 'There was an error uploading the resource :(' });
  }
});

router.post('/resource/:id/add-comment', auth2, async (req, res) => {
  try {
    let user = null;
    let username = req.body.username;
    let name = username;
    let avatar =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Baby_Face.JPG/1600px-Baby_Face.JPG';
    if (req.user) {
      const userdata = await User.findOne({
        _id: req.user.id,
      }).select('-password');
      const profile = await Profile.findOne({ username: userdata.username });
      name = userdata.name;
      avatar = profile.imageLink;
      user = userdata._id;
      username = userdata.username;
    }
    const resource = await Resource.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name,
      avatar,
      username,
      user,
    };

    resource.comments.push(newComment);
    await resource.save();
    res.json(resource);
  } catch (err) {
    res
      .status(500)
      .json({ err: 'There was an error uploading the resource :(' });
  }
});

router.post('/resource/:id/delete-comment', auth2, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    //pull out comment
    const comment = resource.comments.find(
      comment => comment._id.toString() === req.body.commentId
    );
    //Make sure comment exists
    if (!comment)
      return res.status(404).json({ msg: 'Comment does not exist' });

    //Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    //Get the remove index
    const removeIndex = resource.comments
      .map(comment => comment.user)
      .indexOf(req.user.id);

    resource.comments.splice(removeIndex, 1);

    await resource.save();

    res.json(resource);
  } catch (err) {
    console.log(err);
    console.log('there was an error deleting the comment', err);
    console.error(err.message);
    res.status(500).send('Server error!');
  }
});

module.exports = router;
