const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const {
  getUsers, getProfile, getMyProfile, updateProfile, updateAvatarProfile,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMyProfile);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }).unknown(true),
}), getProfile);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/),
  }).unknown(true),
}), updateAvatarProfile);

module.exports = router;
