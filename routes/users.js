const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const {
  getUsers, getProfile, updateProfile, updateAvatarProfile,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', getProfile);

router.patch('/me',celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }).unknown(true),
}),  updateProfile);

router.patch('/me/avatar',celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().pattern(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
  }).unknown(true),
}),  updateAvatarProfile);

module.exports = router;
