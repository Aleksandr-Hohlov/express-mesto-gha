const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getAllUsers,
  getUserById,
  updateUserInfo,
  updateAvatar,
  getUser,
} = require('../controllers/users');

router.use(auth);
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/me', getUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
