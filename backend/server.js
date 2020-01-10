const express = require('express'); //express framework 'middleware'
const mongoose = require('mongoose'); //Will allow to handle connection to MongoDB
const cookieParser = require('cookie-parser'); //to save our token in the cookie
const cors = require('cors'); //cross origin resource sharing (since backend and frontend are from different origin from each other, so this will allow front end to consume backend API)
//const logger = require('morgan'); //will allow us to log REST operation with status
const _ = require('lodash');

//instance of express
const app = express();

//cross origin resource sharing
//setting headers for application with allowed operations
app.use(cors());

const dbConfig = require('./config/secret');

//Creating real time update on website without refreshing the page using socket.io
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const { User } = require('./Helpers/UserClass');

app.use(express.json({ limit: '50mb' })); //we specify that we are returning or sending our data in the JSON format with a limit size of data
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static('public'));
//app.use(logger('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, { useUnifiedTopology: true, useNewUrlParser: true });

//we pass io to streams
require('./socket/streams')(io, User, _);
require('./socket/private')(io);

const auth = require('./routes/authRoutes');
const posts = require('./routes/postRoutes');
const users = require('./routes/userRoutes');
const requests = require('./routes/requestsRoutes');
const ratings = require('./routes/ratingRoutes');
const message = require('./routes/messageRoutes');

//default path /api/chatapp
app.use('/api/chatapp', auth);
app.use('/api/chatapp', posts);
app.use('/api/chatapp', users);
app.use('/api/chatapp', requests);
app.use('/api/chatapp', ratings);
app.use('/api/chatapp', message);

//Server running on port 3000 , we pass instead of app server to use socket.io
server.listen(3000, () => {
  console.log('Running on port 3000');
});
