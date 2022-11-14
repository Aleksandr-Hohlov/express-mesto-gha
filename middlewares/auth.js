const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Сессия истекла. Повторите авторизацию.');
  }
  let payload;
  try {
    payload = jwt.verify(
      authorization.replace('Bearer ', ''),
      '5066e19ca0f3f2521d7c7ef07d99c7307c5533cea846d26f4b9408932f1fc99f',
    );
  } catch (err) {
    next(new UnauthorizedError('Сессия истекла. Повторите авторизацию.'));
  }
  req.user = payload;
  next();
};
