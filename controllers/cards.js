const Card = require('../models/card');
const { ERROR_MESSAGE } = require('../constants/constants');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(404).send({ message: ERROR_MESSAGE.NOT_FOUND.CARD });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: ERROR_MESSAGE.BAD_REQUEST.CARD });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

// prettier-ignore
const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  {
    new: true,
    runValidators: true,
  },
)
  .then((card) => {
    if (card) {
      res.send(card);
    } else {
      res.status(404).send({ message: ERROR_MESSAGE.NOT_FOUND.CARD });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: ERROR_MESSAGE.BAD_REQUEST.CARD });
    } else {
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  });

// prettier-ignore
const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  {
    new: true,
    runValidators: true,
  },
)
  .then((card) => {
    if (card) {
      res.send(card);
    } else {
      res.status(404).send({ message: ERROR_MESSAGE.NOT_FOUND.CARD_LIKES });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: ERROR_MESSAGE.BAD_REQUEST.CARD });
    } else {
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  });

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
