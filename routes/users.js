const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const {
  getUsers, getProfile, getMyProfile, updateProfile, updateAvatarProfile,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMyProfile);

router.get('/:id', getProfile);

router.patch('/me', updateProfile);

router.patch('/me/avatar',celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
  }).unknown(true),
}),  updateAvatarProfile);

module.exports = router;
