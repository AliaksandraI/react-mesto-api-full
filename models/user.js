const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        const regEx = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
        return regEx.test(link);
      },
      message: 'Invalid URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regEx.test(email);
      },
      message: 'Invalid email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);