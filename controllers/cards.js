const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  Card.create({ name: req.body.name, link: req.body.link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .then((card) => {
      if (card.owner._id.toString() === req.user._id) {
        card.remove().then(() => res.send({ message: 'Карточка удалена' }));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params._id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => {
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params._id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
