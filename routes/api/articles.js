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
    const user = await User.findById(req.user.id);
    const articles = await Article.find({
      parentIdentificator: user.parentIdentificator.toString(),
    }).sort([['date', -1]]);
    res.json({ articles });
  } catch (err) {
    console.log('the error is', err);
    res.status(500).json({
      err: `There was an error retrieving the articles`,
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
        parentIdentificator: user.parentIdentificator,
        username: profile.username,
        title: req.body.title,
        text: req.body.text,
        avatar: profile.imageLink,
        date: now,
        privada: req.body.privada,
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
router.get('/user/:username', async (req, res) => {
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
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.json({ article });
  } catch (err) {
    res.status(500).json({
      err: `There was an error retrieving the article ${req.params.id}`,
    });
  }
});

// @route   PUT api/articles/:id
// @desc    UPDATE article with id
// @access  Private

router.put('/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ msg: 'No article found with that ID' });
    }
    //Check ownership of the article
    if (article.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    article.title = req.body.title;
    article.text = req.body.text;
    article.privada = req.body.privada;
    article.updated = true;
    article.pregnancyDate = functions.calculateWeekFromNow(profile.miracle);
    await article.save();
    res.json({ updatedArticle: article, msg: 'The article was updated' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No article found with that ID' });
    }
    res.status(500).send('Server error!');
  }
});

// @route   DELETE api/article/:id
// @desc    Delete a specific article
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ msg: 'No article found with that ID' });
    }

    //Check ownership of the article
    if (article.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await article.remove();

    res.json({ msg: 'The article was deleted' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No article found with that ID' });
    }
    res.status(500).send('Server error!');
  }
});

// @route   POST api/articles/comment/:id
// @desc    Comment on an article
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
      const article = await Article.findById(req.params.id);
      const profile = await Profile.findOne({ user: req.user.id });

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: profile.imageLink,
        username: profile.username,
        user: req.user.id,
      };

      article.comments.push(newComment);
      article.save();

      res.json(article.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error!');
    }
  }
);

// @route   DELETE api/article/comment/:id/:comment_id
// @desc    Delete a comment on an article
// @access  Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    //pull out comment
    const comment = article.comments.find(
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
    const removeIndex = article.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    article.comments.splice(removeIndex, 1);

    await article.save();
    res.json(article.comments);
  } catch (err) {
    console.log('there was an error deleting the comment', err);
    console.error(err.message);
    res.status(500).send('Server error!');
  }
});

module.exports = router;
