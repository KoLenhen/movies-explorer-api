const mongoose = require('mongoose');
const validation = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 2,
    maxlength: 56,
    required: true,
  },
  director: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    minlength: 20,
    maxlength: 500,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validation.isURL(v);
      },
      message: 'URL введён некорректно',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validation.isURL(v);
      },
      message: 'URL введён некорректно',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validation.isURL(v);
      },
      message: 'URL введён некорректно',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: 'user',
  },
  movieId: {
    type: String,
  },
  nameRU: {
    type: String,
    minlength: 1,
    maxlength: 200,
    required: true,
  },
  nameEN: {
    type: String,
    minlength: 1,
    maxlength: 200,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
