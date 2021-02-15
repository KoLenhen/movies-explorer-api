require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const router = require('./router/index');
const ServerError = require('./errors/server-error');
const celebrateErrorHandler = require('./errors/celebrate-validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// eslint-disable-next-line no-undef
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(celebrateErrorHandler);
app.use(ServerError);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
