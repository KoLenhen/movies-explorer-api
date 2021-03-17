const movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const AuthorizedButForbidden = require('../errors/authorized-but-forbidden');

const getMovies = (req, res, next) => {
  movie.find({})
    // .orFail(new NotFoundError('В коллекции нет фильмов'))
      .then((movies) =>
        res.status(200)
      .send(movies))
      .catch(next);
}

const createMovie = (req, res, next) => {
  const { country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId } = req.body;

  movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movieData) => {
      res.status(200)
        .send(movieData);
    })
    .catch(next);
}

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const ownerId = req.user._id;
  movie.findById(movieId)
    .orFail(new NotFoundError('Нет фильма с таким id'))
    .then((movieData) => {
      if (movieData.owner.toString() !== ownerId)
        throw new AuthorizedButForbidden('Попытка удалить/редактировать информацию другого пользователя');
      return movie.findByIdAndRemove(movieId)
        .then((movieDelete) =>
          res.status(200)
            .send(movieDelete));
    })
    .catch(next);
}

module.exports = { getMovies, createMovie, deleteMovie };
