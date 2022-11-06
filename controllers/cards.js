const Card = require('../models/card');
const { STATUS, ERROR_MESSAGE, ERROR_NAME } = require('../constants/constants');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === ERROR_NAME.VALIDATION) {
        res.status(STATUS.BAD_REQUEST).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(STATUS.NOT_FOUND).send({ message: ERROR_MESSAGE.NOT_FOUND.CARD });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS.BAD_REQUEST).send({ message: ERROR_MESSAGE.BAD_REQUEST.CARD });
      } else {
        res.status(500).send({ message: err.message });
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
      res.status(STATUS.NOT_FOUND).send({ message: ERROR_MESSAGE.NOT_FOUND.CARD });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(STATUS.BAD_REQUEST).send({ message: ERROR_MESSAGE.BAD_REQUEST.CARD });
    } else {
      res.status(500).send({ message: err.message });
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
      res.status(STATUS.NOT_FOUND).send({ message: ERROR_MESSAGE.NOT_FOUND.CARD_LIKES });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(STATUS.BAD_REQUEST).send({ message: ERROR_MESSAGE.BAD_REQUEST.CARD });
    } else {
      res.status(500).send({ message: err.message });
    }
  });

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
