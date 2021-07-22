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
    // const resources = await Resource.find({});
    const resources = [
      {
        link: 'http://www.human.music.com',
        name: 'Recurso 1',
        addedBy: 'María Ignacia Sanhueza',
      },
      {
        link: 'http://www.human.music.com',
        name: 'Recurso 2',
        addedBy: 'Felipe',
      },
      {
        link: 'http://www.human.music.com',
        name: 'Recurso 3',
        addedBy: 'Chocapec',
      },
    ];

    res.json(resources);
  } catch (err) {
    console.log('the error is', err);
    res.status(500).json({
      err: `There was an error retrieving the resources`,
    });
  }
});

// @route   GET api/resources/:category
// @desc    GET all resources by category
// @access  Private
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
    const newResource = new Resource({
      category: req.body.category,
      addedBy: req.body.addedBy,
      description: req.body.description,
      url: req.body.url,
    });
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

module.exports = router;
