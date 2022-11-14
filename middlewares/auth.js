const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { messageErr } = require('../constants/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(messageErr.badRequest.auth);
  }

  let payload;

  try {
    payload = jwt.verify(authorization.replace('Bearer ', ''), 'some-secret-key');
  } catch (err) {
    next(new UnauthorizedError(messageErr.badRequest.auth));
  }
  req.user = payload;
  next();
};
