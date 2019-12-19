//to add mongoose schema that we are going to use in our db
const mongoose = require('mongoose');

//structure of user informations in DB
const userSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String }
});

module.exports = mongoose.model('User', userSchema); //User is the referance to the collection related to the userSchema in DB
