const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/:userId', getUserById);
router.post('/users', createUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
