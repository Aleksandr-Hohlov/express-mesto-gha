const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  userIdValidation,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

// prettier-ignore
const {
  getAllUsers, updateUserInfo, updateAvatar, getUser,
} = require('../controllers/users');

router.use(auth);
router.get('/', getAllUsers);
router.get('/:userId', userIdValidation, getUser);
router.get('/me', getUser);
router.patch('/me', updateUserValidation, updateUserInfo);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
