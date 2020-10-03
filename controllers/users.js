const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

const getUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

const getProfile = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const getMyProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      }
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .catch(next);
};

const updateAvatarProfile = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      }
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .catch(next);
};

module.exports = {
  getUsers, getProfile, getMyProfile, updateProfile, updateAvatarProfile,
};
