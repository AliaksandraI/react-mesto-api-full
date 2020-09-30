
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const notfoundRouter = require('./routes/notfound');
const { createUser, login } = require('./controllers/auth');
const auth = require('./middlewares/auth');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const app = express();
const { requestLogger, errorLogger } = require('./middlewares/logger'); 

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.post('/signin',celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(6),
  }).unknown(true),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().pattern(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
    email: Joi.string().required().pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: Joi.string().required().min(6),
  }).unknown(true),
}), createUser); 

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', notfoundRouter);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
    res.status(statusCode)
    .send({message: statusCode === 500 ? 'На сервере произошла ошибка' : message});
}); 


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
