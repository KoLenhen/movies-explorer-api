const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validation = require('validator');
const NotFoundError = require('../errors/not-found-error');
const Unauthorized = require('../errors/unauthorized');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validation.isEmail(v);
      },
      message: 'Email введён некорректно',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  name: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
});

userSchema.statics.findUserByCreds = function (email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new NotFoundError('Нет пользователя с email'))
    .then((userData) => {
      return bcrypt.compare(password, userData.password)
        .then((matched) => {
          if (!matched) throw new Unauthorized('Не правильный email и/или пароль');
          return { email: userData.email, name: userData.name, userId: userData._id };
        });
    });
}

module.exports = mongoose.model('user', userSchema);
