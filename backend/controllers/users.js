const httpStatus = require('http-status-codes');

const User = require('../models/userModels');
const Post = require('../models/postModels');
module.exports = {
  /** Get All the USERS ***/
  async GetAllUsers(req, res) {
    //returns all users in array
    await User.find({})
      .populate('posts.postId')
      .then(result => {
        res.status(httpStatus.OK).json({ message: 'All users', result });
      })
      .catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occured when getting all users' });
      });
  },

  /** Get A Single User By ID ***/
  async GetUser(req, res) {
    //returns all users in array
    await User.findOne({ _id: req.params.id })
      .populate('posts.postId')
      .populate('tasks.taskId')
      .populate({
        //nested objects population
        path: 'tasks.taskId',
        populate: {
          path: 'postId',
          model: Post
        }
      })
      .then(result => {
        res.status(httpStatus.OK).json({ message: 'User By ID', result });
      })
      .catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occured when getting a user by ID' });
      });
  },

  /** Get A User by Username***/
  async GetUserByName(req, res) {
    //returns all users in array
    await User.findOne({ username: req.params.username })
      .populate('posts.postId')
      .then(result => {
        res.status(httpStatus.OK).json({ message: 'User By username', result });
      })
      .catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occured when getting a user by username' });
      });
  }
};
