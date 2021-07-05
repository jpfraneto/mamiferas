const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  website: {
    type: String,
  },
  miracle: {
    type: Date,
  },
  location: {
    type: String,
  },
  images: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'image',
      },
    },
  ],
  bio: {
    type: String,
  },
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
