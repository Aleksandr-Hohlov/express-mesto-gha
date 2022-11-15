const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const NotFoundError = require('./errors/NotFoundError');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { loginUser, createUser } = require('./controllers/users');
const { messageErr } = require('./constants/constants');
const handleErrors = require('./middlewares/handleErrors');
const { createUserValidation, loginValidation } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '636812fe2b2fabadd45ea998',
  };
  next();
});
app.post('/signin', loginValidation, loginUser);
app.post('/signup', createUserValidation, createUser);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', () => {
  throw new NotFoundError(messageErr.notFound.page);
});
app.use(errors());
app.use(handleErrors);

app.listen(PORT);
