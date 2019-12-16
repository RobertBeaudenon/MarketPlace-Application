//to add mongoose schema that we are going to use in our db
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String }
});

module.exports = mongoose.model('User', userSchema);
