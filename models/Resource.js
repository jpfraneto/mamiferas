const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  addedBy: {
    type: String,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
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
});

module.exports = Resource = mongoose.model('resource', ResourceSchema);
