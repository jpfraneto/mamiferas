const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  privada: {
    type: Boolean,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      username: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  pregnancyDate: {
    type: String,
  },
});

module.exports = Article = mongoose.model('article', ArticleSchema);
