
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
//const userRouter = require('./routes/users');
//const cardsRouter = require('./routes/cards');
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
//app.use('/users', userRouter);
//app.use('/cards', cardsRouter);

app.post('/signin', login);
app.post('/signup', createUser); 

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', notfoundRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
