const mongoose = require('mongoose');

//structure of post info in DB
const postSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //we save the autrogenerated id of the user and make reference to the user collection so that we can link that post to the user concerned
  username: { type: String, default: '' }, //we save the username of the user
  post: { type: String, default: '' }, //represent the post of the user
  comments: [
    //is the array of comments related to that particular post
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //each comment will have that structure
      username: { type: String, default: '' },
      comment: { type: String, default: '' },
      createdAt: { type: Date, default: Date.now() }
    }
  ],
  totalLikes: { type: Number, default: 0 }, //the number of likes related to that post
  likes: [
    //is the array of likes related to that post
    {
      username: { type: String, default: '' } //we save the username of the user that made the like
    }
  ],
  created: { type: Date, default: Date.now() } //when was the post created
});

module.exports = mongoose.model('Post', postSchema); //Post is the referance related to the collection related to the postSchema
