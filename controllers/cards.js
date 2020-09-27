const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((data) => res.status(200).send(data))
    .catch((error) => {
      if (error.message) {
        res.status(400).send({ message: error.message });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (error.message) {
        res.status(400).send({ message: error.message });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (data) {
        return res.status(200).send(data);
      }
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    })
    .catch((error) => {
      if (error.message) {
        res.status(400).send({ message: error.message });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (error.message) {
        res.status(400).send({ message: error.message });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((data) => {
      if (data) {
        return res.status(200).send(data);
      }
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    })
    .catch((error) => {
      if (error.message) {
        res.status(400).send({ message: error.message });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
