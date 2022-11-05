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

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
mongoose.connect(MONGO_URL);

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.listen(PORT);
