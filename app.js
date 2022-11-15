const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const app = express();
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const NotFoundError = require('./errors/NotFoundError');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { loginUser, createUser } = require('./controllers/users');
const { messageErr } = require('./constants/constants');
const handleErrors = require('./middlewares/handleErrors');
const auth = require('./middlewares/auth');
const { createUserValidation, loginValidation } = require('./middlewares/validation');

app.post('/signin', loginValidation, loginUser);
app.post('/signup', createUserValidation, createUser);

app.use('/cards', cardRouter);
app.use('/users', userRouter);

app.use(auth);

app.use(errors());
app.use('/*', () => {
  throw new NotFoundError(messageErr.notFound.page);
});

app.use(handleErrors);

app.listen(PORT);
