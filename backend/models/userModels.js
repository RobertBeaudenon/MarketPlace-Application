//to add mongoose schema that we are going to use in our db
const mongoose = require('mongoose');

//structure of user informations in DB
const userSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  posts: [
    //we link posts related to user
    {
      postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, //making a referance to the post collection
      post: { type: String },
      created: { type: Date, default: Date.now() }
    }
  ]
});

module.exports = mongoose.model('User', userSchema); //User is the referance to the collection related to the userSchema in DB
