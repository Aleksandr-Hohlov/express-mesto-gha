const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
    },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' })); // prettier-ignore
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' })); // prettier-ignore
};

module.exports = {
  getUsers,
  updateUserInfo,
  getUserId,
  updateAvatar,
  createUser,
};
