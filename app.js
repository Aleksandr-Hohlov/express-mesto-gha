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
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.post('/signin', loginUser);
app.post('/signup', createUser);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use(auth);

app.use('/*', () => {
  throw new NotFoundError(messageErr.notFound.page);
});
app.use(errors());
app.use(handleErrors);

app.listen(PORT);
