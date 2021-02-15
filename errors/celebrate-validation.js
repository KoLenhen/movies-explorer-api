const { isCelebrateError } = require('celebrate');
const BadRequest = require('../errors/bad-request');

const celebrateErrorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) throw new BadRequest('Переданные данные не корректны');
  return next(err);
}

module.exports = celebrateErrorHandler;
