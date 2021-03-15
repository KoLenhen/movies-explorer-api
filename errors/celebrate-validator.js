const { celebrate, Joi } = require('celebrate');

const loginUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2).max(30),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const getUserValidator = celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(56),
    director: Joi.string().required().min(2).max(50),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required().min(20).max(2500),
    image: Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/).required(),
    trailer:  Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/).required(),
    nameRU: Joi.string().required().min(1).max(200),
    nameEN: Joi.string().required().min(1).max(200),
    movieId: Joi.number().required(),
    thumbnail:  Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/).required(),
  }).unknown(true),
});

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }).unknown(true),
});

module.exports = {
  loginUserValidator,
  createUserValidator,
  updateUserValidator,
  getUserValidator,
  createMovieValidator,
  deleteMovieValidator
 };
