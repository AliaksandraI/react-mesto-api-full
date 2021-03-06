const express = require('express');
const { celebrate, Joi } = require('celebrate');

const users = express.Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

users.get('/', getCards);

users.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
  }).unknown(true),
}), createCard);

users.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }).unknown(true),
}), deleteCard);

users.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }).unknown(true),
}), likeCard);

users.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }).unknown(true),
}), dislikeCard);

module.exports = users;
