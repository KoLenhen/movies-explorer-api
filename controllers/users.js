const bcrypt = require('bcryptjs');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request');
const ConflictError = require('../errors/conflict-error');
// eslint-disable-next-line no-undef
const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  const userId = req.user._id;
  if (!userId || userId.length !== 24) throw new Error('Неправильный ID');
  user.findById(userId)
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((userData) => {
      res
        .status(200)
        .send(userData)
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  if (!email || !password || !password.trim()) throw new BadRequestError('Не правильный email и/или пароль');
  return user.findOne({ email })
  .then((user) => {
    if (user) {
      throw new ConflictError('Пользователь с таким email уже существует')
    }
    return bcrypt.hash(password, 10);
  })
  .then((hash) => {
          user.create({ email, name, password: hash })
        .then((userData) => res
          .status(200)
          .send(userData))
    }).catch(next);
};


const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  user.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((userData) => res
      .status(200)
      .send(userData))
    .catch(next);
};


const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return user.findUserByCreds(email, password)
    .then((userData) => {
      const token =
        jwt.sign({ _id: userData.userId },
          (NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'),
          { expiresIn: '7d' });
      res.status(200)
        .send({
          message: 'Авторизация успешна!',
          user: {
            _id: userData.userId,
            email: userData.email,
            name: userData.name,
          },
          token
        });
    })
    .catch(next);
};

module.exports = { getUser, updateUser, createUser, loginUser };
