const usersRouter = require('express').Router();

const {
  getUsers,
  getCurrentUser,
  getUserId,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.get('/users/:userId', getUserId);
usersRouter.patch('/users/me', updateUser);
usersRouter.patch('/users/me/avatar', updateAvatar);

module.exports = usersRouter;
