const express = require('express'); //express framework 'middleware'
const mongoose = require('mongoose'); //Will allow to handle connection to MongoDB
const cookieParser = require('cookie-parser'); //to save our token in the cookie
const cors = require('cors'); //cross origin resource sharing (since backend and frontend are from different origin from each other, so this will allow front end to consume backend API)
//const logger = require('morgan'); //will allow us to log REST operation with status

//instance of express
const app = express();

app.use(cors());

const dbConfig = require('./config/secret');

//setting headers for application with allowed operations
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT', 'OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.json({ limit: '50mb' })); //we specify that we are returning or sending our data in the JSON format with a limit size of data
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
//app.use(logger('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, { useUnifiedTopology: true, useNewUrlParser: true });

const auth = require('./routes/authRoutes');
const posts = require('./routes/postRoutes');

//default path /api/chatapp
app.use('/api/chatapp', auth);
app.use('/api/chatapp', posts);

//Server running on port 3000
app.listen(3000, () => {
  console.log('Running on port 3000');
});
