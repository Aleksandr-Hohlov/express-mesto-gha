/* eslint-disable import/extensions */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-unresolved

const cardsRouter = require('./routes/cards');

const app = express();
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb'); // подключаемся к базе данных
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  req.user = { _id: '636544c2d1821e9e0b7312c7' };

  next();
});

app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
