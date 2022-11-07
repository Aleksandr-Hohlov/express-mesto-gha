const Card = require('../models/card');
const {
  err500,
  err400,
  err404,
  messageErrDefault,
  messageErr,
  ValidationError,
  CastError,
} = require('../constants/constants');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(err500).send({ message: messageErrDefault }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === ValidationError) {
        res.status(err400).send({ message: messageErr.badRequest.card });
      } else {
        res.status(err500).send({ message: messageErrDefault });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(err404).send({ message: messageErr.notFound.card });
      }
    })
    .catch((err) => {
      if (err.name === CastError) {
        res.status(err400).send({ message: messageErr.badRequest.card });
      } else {
        res.status(err500).send({ message: messageErrDefault });
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
      res.status(err404).send({ message: messageErr.notFound.card });
    }
  })
  .catch((err) => {
    if (err.name === CastError) {
      res.status(err400).send({ message: messageErr.badRequest.cardLike });
    } else {
      res.status(err500).send({ message: messageErrDefault });
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
      res.status(err404).send({ message: messageErr.notFound.cardLike });
    }
  })
  .catch((err) => {
    if (err.name === CastError) {
      res.status(err400).send({ message: messageErr.badRequest.cardLike });
    } else {
      res.status(err500).send({ message: messageErrDefault });
    }
  });

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
