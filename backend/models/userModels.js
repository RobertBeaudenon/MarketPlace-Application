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
      taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
      userDoingTaskUsername: { type: String, default: '' },
      taskOwnerUsername: { type: String, default: '' },
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
  ],
  //to keep track of how many users a particular user is chatting with
  chatList: [
    {
      receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //id of receiver
      msgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
    }
  ],
  totalTasksCompleted: { type: Number, default: 0 },
  ratingNumber: [Number],
  ratingSum: { type: Number, default: 0 },
  picVersion: { type: String, default: '' },
  picS3Key: { type: String, default: '' },
  images: [
    {
      imgS3Key: { type: String, default: '' },
      imgS3URL: { type: String, default: '' }
    }
  ]
});

module.exports = mongoose.model('User', userSchema); //User is the referance to the collection related to the userSchema in DB
