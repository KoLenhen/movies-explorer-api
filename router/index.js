const router = require('express').Router();
const usersRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, loginUser, logoutUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const { loginUserValidator, createUserValidator } = require('../errors/celebrate-validator');

router.use('/users', auth, usersRouter);
router.use('/movies', auth, movieRouter);
router.post('/signup', createUserValidator, createUser);
router.post('/signin', loginUserValidator, loginUser);
router.post('/signout', logoutUser);
router.all('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
