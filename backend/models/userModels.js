//to add mongoose schema that we are going to use in our db
const mongoose = require('mongoose');

//structure of user informations in DB
const userSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  major: { type: String, default: '' },
  description: { type: String, default: '' },
  posts: [
    //we link posts related to user
    {
      postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, //making a referance to the post collection
      post: { type: String },
      created: { type: Date, default: Date.now() }
    }
  ],
  requesting: [
    //you made a request on post to help other users
    {
      userRequested: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //id of user that made the request will be added to the array of requests
      postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, //id of post on which the request was made
      username: { type: String, default: '' },
      createdAt: { type: Date, default: Date.now() }
    }
  ],
  requesters: [
    //Users who are requesting to help you a on a post you made
    {
      requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //id of user that made the request will be added to the array of requests
      postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, //id of post on which the request was made
      username: { type: String, default: '' },
      createdAt: { type: Date, default: Date.now() }
    }
  ],
  tasks: [
    {
      taskOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      userDoingTask: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, //id of post on which the request was made
      username: { type: String, default: '' },
      completed: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now() }
    }
  ],
  notifications: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      message: { type: String },
      viewProfile: { type: Boolean, default: false },
      created: { type: Date, default: Date.now() },
      read: { type: Boolean, default: false },
      date: { type: String, default: '' } //we add it to receive a notification once, instead of 5 times if we visit a profile 5 times
    }
  ]
});

module.exports = mongoose.model('User', userSchema); //User is the referance to the collection related to the userSchema in DB
