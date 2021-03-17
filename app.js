require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const router = require('./router/index');
const ServerError = require('./errors/server-error');
const celebrateErrorHandler = require('./errors/celebrate-validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, loginUser } = require('./controllers/users');
const { loginUserValidator, createUserValidator } = require('./errors/celebrate-validator');
const auth = require('./middlewares/auth');
const corsParams  = require('./middlewares/corsValidatior');
const cors = require('cors');
// eslint-disable-next-line no-undef
const { PORT = 3001 } = process.env;
// app.use(cors());
mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());



// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(cors(corsParams));

app.use(requestLogger);

app.post('/signup', createUserValidator, createUser);
app.post('/signin', loginUserValidator, loginUser);
app.use('/', auth, router);
app.use(errorLogger);
app.use(celebrateErrorHandler);
app.use(ServerError);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
