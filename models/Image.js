const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  imageType: {
    type: String,
  },
  username: {
    type: String,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  systemUser: {
    type: Boolean,
  },
  title: {
    type: String,
  },
  alt: {
    type: String,
  },
  text: {
    type: String,
  },
  secure_url: {
    type: String,
  },
  updated: {
    type: Boolean,
    default: false,
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
      username: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  pregnancyDate: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  privada: {
    type: Boolean,
    default: false,
  },
});

module.exports = Image = mongoose.model('image', ImageSchema);
