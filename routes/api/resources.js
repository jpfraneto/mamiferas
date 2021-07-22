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
    const resourcesInfo = {
      embarazo: 0,
      parto: 0,
      puerperio: 0,
      lactancia: 0,
      crianza: 0,
      relaciones: 0,
    };
    const resources = await Resource.find({});
    //calcular cuántos de cada recurso hay.
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
    console.log('the found resource is: ', resource);
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
