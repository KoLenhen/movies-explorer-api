const router = require('express').Router();
const usersRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/not-found-error');

router.use('/users', usersRouter);
router.use('/movies', movieRouter);

router.all('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
