const Joi = require('@hapi/joi'); //Will help us validate the data that we are getting from the frontend before sending it to the db
const HttpStatus = require('http-status-codes'); //instead of writing 200 we wirte HttpStatus.GOOD_REQUEST

const Post = require('../models/postModels');
const User = require('../models/userModels');
module.exports = {
  /****  Add a POST  ****/
  AddPost(req, res) {
    //Joi validation on input
    const schema = Joi.object({
      post: Joi.string().required() //must be a string,shouldn't be empty
    });
    const { error, value } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
    }

    //Create new structure of object that will be inserted in DB
    const newBody = {
      //remember that in our request we always pass the 'user' object that contains the details
      user: req.user._id,
      username: req.user.username,
      post: req.body.post,
      created: new Date()
    };

    //We use the mongoose build in method to insert the post in the DB
    Post.create(newBody)
      .then(async post => {
        //When we create a new post we get the user related to that post and add that post to the array of posts related to that user, (update is form mongoose)

        await User.update(
          {
            _id: req.user._id
          },
          {
            $push: {
              posts: {
                postId: post._id,
                post: req.body.post,
                created: new Date()
              }
            }
          }
        );
        res.status(HttpStatus.OK).json({ message: 'Post created', post });
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occured fromhere' });
      });
  }
};
