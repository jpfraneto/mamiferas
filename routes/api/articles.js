const express = require('express');
const router = express.Router();
const { cloudinary } = require('../../utils/cloudinary');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Image = require('../../models/Image');
const Article = require('../../models/Article');
const Profile = require('../../models/Profile');
const functions = require('../../utils/functions');

// @route   GET api/articles
// @desc    GET all articles
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const articles = await Article.find({}).sort([['date', -1]]);
    res.json({ articles });
  } catch (err) {
    res.status(500).json({
      err: `There was an error retrieving the article ${req.params.id}`,
    });
  }
});

// @route   POST api/articles
// @desc    Create an article
// @access  Private

router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const user = await User.findById(req.user.id).select('-password');
      const now = new Date();
      const newArticle = new Article({
        user: req.user.id,
        name: user.name,
        username: profile.username,
        title: req.body.title,
        text: req.body.text,
        avatar: profile.imageLink,
        date: now,
        pregnancyDate: functions.calculateWeekFromNow(profile.miracle),
      });
      await newArticle.save();
      profile.articles.push(newArticle);
      await profile.save();
      res.json({
        msg: 'The article was saved to the DB and uploaded to the user',
        newArticle,
      });
    } catch (err) {
      res
        .status(500)
        .json({ err: 'There was an error uploading the article :(' });
    }
  }
);

// @route   GET api/articles/user/:username
// @desc    GET all articles from an user
// @access  Private
router.get('/user/:username', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      username: req.params.username,
    }).populate('articles');
    res.json({ articles: profile.articles });
  } catch (err) {
    res.status(500).json({
      err: `There was an error retrieving the articles from the user ${req.params.username}`,
    });
  }
});

// @route   GET api/articles/:id
// @desc    GET article with id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.json({ article });
  } catch (err) {
    res.status(500).json({
      err: `There was an error retrieving the article ${req.params.id}`,
    });
  }
});

module.exports = router;
