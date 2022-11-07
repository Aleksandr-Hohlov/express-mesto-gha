const User = require('../models/user');
const {
  err500,
  err400,
  err404,
  messageErrDefault,
  messageErr,
  ValidationError,
  CastError,
} = require('../constants/constants');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(err500).send({ message: messageErrDefault }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(err404).send({ message: messageErr.notFound.user });
      }
    })
    .catch((err) => {
      if (err.name === CastError) {
        res.status(err400).send({ message: messageErr.badRequest.getUserById });
      } else {
        res.status(err500).send({ message: messageErrDefault });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === ValidationError) {
        res.status(err400).send({ message: messageErr.badRequest.createUser });
      } else {
        res.status(err500).send({ message: messageErrDefault });
      }
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(err404).send({ message: messageErr.notFound.user });
      }
    })
    .catch((err) => {
      if (err.name === ValidationError || err.name === CastError) {
        res.status(err400).send({ message: messageErr.badRequest.updateUserInfo });
      } else {
        res.status(err500).send({ message: messageErrDefault });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(err404).send({ message: messageErr.notFound.user });
      }
    })
    .catch((err) => {
      if (err.name === ValidationError || err.name === CastError) {
        res.status(err400).send({ message: messageErr.badRequest.updateAvatar });
      } else {
        res.status(err500).send({ message: messageErrDefault });
      }
    });
};

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  updateUserInfo,
  updateAvatar,
};
