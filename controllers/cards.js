const Card = require('../models/card');
const {
  messageErr,
  ValidationError,
  CastError,
  messageErrDefault,
  messageSuccessDel,
} = require('../constants/constants');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === ValidationError) {
        next(new BadRequestError(messageErr.badRequest.card));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError(messageErr.notFound.card));
      } else if (String(card.owner) === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => res.status(200).send({ message: messageSuccessDel }))
          .catch(() => next(new NotFoundError(messageErr.notFound.card)));
      } else {
        throw new ForbiddenError(messageErr.badRequest.forbiddenDel);
      }
    })
    .catch((err) => {
      if (err.name === CastError) {
        next(new BadRequestError(messageErrDefault));
      } else {
        next(err);
      }
    });
};

// prettier-ignore
const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  {
    new: true,
    runValidators: true,
  },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError(messageErr.notFound.card);
    }
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === CastError) {
      next(new BadRequestError(messageErr.badRequest.cardLike));
    } else {
      next(err);
    }
  });

// prettier-ignore
const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  {
    new: true,
    runValidators: true,
  },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError(messageErr.notFound.cardLike);
    }
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === CastError) {
      next(new BadRequestError(messageErrDefault));
    } else {
      next(err);
    }
  });

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
