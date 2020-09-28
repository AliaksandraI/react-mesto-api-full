
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const notfoundRouter = require('./routes/notfound');
const { createUser, login } = require('./controllers/auth');
const auth = require('./middlewares/auth');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

/*
app.use((req, res, next) => {
  req.user = {
    _id: '5f4d4ad9432f43ee09bd7620',
  };

  next();
});
*/


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/signin', login);
app.post('/signup', createUser); 

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', notfoundRouter);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
    res.status(statusCode)
    .send({message: statusCode === 500 ? 'На сервере произошла ошибка' : message});
}); 


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
