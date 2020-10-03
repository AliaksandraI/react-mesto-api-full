const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const OwnerError = require('../errors/owner-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const owner = req.user._id;

  if (owner === req.params.id) {
    Card.findOneAndDelete({ _id: req.params.id, owner })
      .then((data) => {
        if (data) {
          return res.status(200).send(data);
        }
        throw new NotFoundError('No card with that id');
      })
      .catch(next);
  }
  throw new OwnerError({ message: 'This card was added by another user' });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((data) => {
      if (data) {
        return res.status(200).send(data);
      }
      throw new NotFoundError('Нет карточки с таким id');
    })
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
