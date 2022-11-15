const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  updateUserInfo,
  updateAvatar,
  getMe,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/me', getMe);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
