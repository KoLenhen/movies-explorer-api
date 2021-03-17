const MethodNotAllowedError = require('../errors/not-allowed');

const allowedCors = [
  'https://kolenmov.students.nomoredomains.icu',
  'https://api.kolenmov.students.nomoredomains.icu',
  'http://localhost:3000',
  'http://localhost:3001',
];

const corsParams = {
  origin(origin, callback) {
    if (allowedCors.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new MethodNotAllowedError('Ошибка доступа(CORS)'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsParams;
