const httpStatus = require('http-status-codes');

const User = require('../models/userModels');
module.exports = {
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
  }
};
