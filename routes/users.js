const router = require('express').Router();
const {
  updateUserValidation,
  updateAvatarValidation,
  userIdValidation,
} = require('../middlewares/validation');

const {
  getAllUsers,
  getUserById,
  updateUserInfo,
  updateAvatar,
  getMe,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', userIdValidation, getUserById);
router.get('/me', updateUserValidation, getMe);
router.patch('/me', updateUserValidation, updateUserInfo);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
