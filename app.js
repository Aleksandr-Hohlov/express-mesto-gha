/* eslint-disable import/extensions */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cardsRouter = require('./routes/cards');
// eslint-disable-next-line import/no-unresolved
const usersRouter = require('./routes/users');

const app = express();

app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  req.user = { _id: '636544c2d1821e9e0b7312c7' };
  next();
});

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
mongoose.connect(MONGO_URL);

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.listen(PORT);
