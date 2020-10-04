require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');

const { PORT = 3000 } = process.env;

const cors = require('cors');
const { createUser, login } = require('./controllers/auth');
const notfoundRouter = require('./routes/notfound');

const app = express();
app.use(cors({ origin: true }));
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.get('/api/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/api/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(/^\w+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/),
    password: Joi.string().required().min(6),
  }).unknown(true),
}), login);

app.post('/api/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
    email: Joi.string().required().pattern(/^\w+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/),
    password: Joi.string().required().min(6),
  }).unknown(true),
}), createUser);

app.use(auth);

app.use('/api/users', require('./routes/users'));
app.use('/api/cards', require('./routes/cards'));

app.use('*', notfoundRouter);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
