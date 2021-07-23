const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  babyBorn: {
    type: Boolean,
    default: false,
  },
  // true for father, false for mother
  parentIdentificator: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  miracle: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resetToken: {
    type: String,
    default: '',
  },
});

module.exports = User = mongoose.model('user', UserSchema);
