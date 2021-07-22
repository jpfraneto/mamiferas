const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  username: {
    type: String,
  },
  babyBorn: {
    type: Boolean,
    default: false,
  },
  parentIdentificator: {
    type: String,
  },
  name: {
    type: String,
  },
  miracle: {
    type: Date,
  },
  location: {
    type: String,
  },
  imageLink: {
    type: String,
  },
  bio: {
    type: String,
  },
  images: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'image',
  },
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'article',
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
