const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'super-strong-secret';

const User = require('../models/user');



module.exports.createUser = (req, res) => {
  const { name, about, avatar, email } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      res.status(201).send({user});
    })
    .catch((error) => {
        if (error.message) {
          res.status(400).send({ message: error.message });
          return;
        }
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, secret, { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
