const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); //to save our token in the cookie
const logger = require('morgan');

//instance of express
const app = express();

const dbConfig = require('./config/secret');

app.use(cookieParser());
app.use(logger('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, { useUnifiedTopology: true }, { useNewUrlParser: true });

//Server running on port 3000
app.listen(3000, () => {
  console.log('Running on port 3000');
});
