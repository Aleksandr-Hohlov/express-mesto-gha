const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'имя пользователя',
    minlength: 2,
    maxlength: 30,
  },

  about: {
    type: String,
    default: 'информация о пользователе',
    minlength: 2,
    maxlength: 30,
  },

  avatar: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('user', userSchema);
