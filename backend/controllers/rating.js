const HttpStatus = require('http-status-codes');

const User = require('../models/userModels');
const Post = require('../models/postModels');
const Task = require('../models/taskModels');

module.exports = {
  /***Adding Rating to user doing task***/
  async AddRating(req, res) {
    await User.update(
      {
        _id: req.params.id
      },
      {
        $push: {
          ratingNumber: req.body.rating
        },

        $inc: { ratingSum: req.body.rating }
      }
    )
      .then(() => {
        res.status(HttpStatus.OK).json({ message: 'Rating added to user' });
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occured when rating a user' }));
  }
};
