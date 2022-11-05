// eslint-disable-next-line import/no-unresolved, import/extensions
const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => next(err));
};

const getCurrentUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ name: user.name, about: user.about }))
    .catch((err) => next(err));
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((newAvatar) => res.send(newAvatar))
    .catch((err) => next(err));
};

const getUserId = (req, res, next) => {
  User.findById(req.params._id)
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports = {
  getUsers,
  getCurrentUser,
  updateUser,
  getUserId,
  updateAvatar,
};
