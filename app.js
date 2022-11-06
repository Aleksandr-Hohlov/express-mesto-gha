const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, next) => {
  req.user = {
    _id: '636812fe2b2fabadd45ea998',
  };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', (res, err) => {
  res.status(404).send({ message: err.message });
});

app.listen(PORT);
