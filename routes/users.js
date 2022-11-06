const usersRouter = require('express').Router();

const {
  getUsers,
  getUserId,
  updateUserInfo,
  updateAvatar,
  createUser,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUserId);
usersRouter.patch('/users/me', updateUserInfo);
usersRouter.patch('/users/me/avatar', updateAvatar);
usersRouter.post('/users', createUser);

module.exports = usersRouter;
