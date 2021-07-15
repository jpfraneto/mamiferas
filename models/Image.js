const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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
  pregnancyDate: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Image = mongoose.model('image', ImageSchema);
