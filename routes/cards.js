const express = require('express');

const users = express.Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

users.get('/', getCards);
users.post('/', createCard);
users.delete('/:id', deleteCard);
users.put('/:cardId/likes', likeCard);
users.delete('/:cardId/likes', dislikeCard);

module.exports = users;
