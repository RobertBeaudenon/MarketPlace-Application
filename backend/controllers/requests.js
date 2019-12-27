const HttpStatus = require('http-status-codes');

const User = require('../models/userModels');
const Post = require('../models/postModels');

module.exports = {
  /*****Create a Request*** */
  AddRequest(req, res) {
    //different way of using async await
    const AddRequest = async () => {
      /******* Update Requesting Array in User *******/
      await User.update(
        {
          _id: req.user._id //We look for the logged in user id to update his requesting array
        },
        {
          $push: {
            requesting: {
              userRequested: req.body.userRequested,
              postId: req.body.postId,
              username: req.body.userRequested.username,
              createdAt: new Date()
            }
          }
        }
      );

      /******* Update Requesters Array in User *******/
      await User.update(
        {
          _id: req.body.userRequested //we look for the user that we want to add a request
        },
        {
          $push: {
            requesters: {
              requester: req.user._id,
              postId: req.body.postId,
              username: req.user.username,
              createdAt: new Date()
            },
            notifications: {
              senderId: req.user._id,
              message: `${req.user.username} is now requesting to help you.`,
              created: new Date(),
              viewProfile: false
            }
          }
        }
      );

      /******* Update Requests Array in Post *******/

      await Post.update(
        {
          _id: req.body.postId, //we find the post by id
          'requests.username': { $ne: req.user.username } //check if logged in user didn't already do a request
        },
        {
          $push: {
            requests: {
              username: req.user.username
            }
          }
        }
      );
    };

    //whatever is done is the async on top will be captured by this method
    AddRequest()
      .then(() => {
        res.status(HttpStatus.OK).json({ message: 'Requested a Service' });
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occured when Requesting a Service' });
      });
  },

  /*****Cancel a Request*** */

  CancelRequest(req, res) {
    //different way of using async await
    const CancelRequest = async () => {
      /******* Update Requesting Array in User *******/

      await User.update(
        {
          _id: req.user._id //We look for the logged in user id to update his requesting array
        },
        {
          $pull: {
            requesting: {
              postId: req.body.postId //remove from the array based on postId
            }
          }
        }
      );

      /******* Update Requesters Array in User *******/

      await User.update(
        {
          _id: req.body.userRequested //we look for the user that we want to add a request
        },
        {
          $pull: {
            requesters: {
              postId: req.body.postId
            }
          }
        }
      );

      /******* Update Requests Array in Post *******/

      await Post.update(
        {
          _id: req.body.postId //we find the post by id
        },
        {
          $pull: {
            requests: {
              username: req.user.username
            }
          }
        }
      );
    };

    //whatever is done is the async on top will be captured by this method
    CancelRequest()
      .then(() => {
        res.status(HttpStatus.OK).json({ message: 'You Canceled a Request' });
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occured when Canceling a Request' });
      });
  },

  /*****Cancel an Application*** */

  CancelApplication(req, res) {
    //different way of using async await
    const CancelApplication = async () => {
      /******* Update Requesters Array in User Logged in  *******/

      await User.update(
        {
          _id: req.user._id //We look for the logged in user id to update his requesters array
        },
        {
          $pull: {
            requesters: {
              postId: req.body.postId //remove from the array based on postId
            }
          }
        }
      );

      /******* Update Requesting Array in user that made the application *******/

      await User.update(
        {
          _id: req.body.userRequested //we look for the user that we want to add a request
        },
        {
          $pull: {
            requesting: {
              postId: req.body.postId
            }
          }
        }
      );

      /******* Update Requests Array in Post *******/

      await Post.update(
        {
          _id: req.body.postId //we find the post by id
        },
        {
          $pull: {
            requests: {
              username: req.body.username
            }
          }
        }
      );
    };

    //whatever is done is the async on top will be captured by this method
    CancelApplication()
      .then(() => {
        res.status(HttpStatus.OK).json({ message: 'You Canceled an Application' });
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occured when Canceling an Application' });
      });
  },

  /***** Mark a Notification as Read ****/
  async MarkNotification(req, res) {
    //if the optional parameter is not present in body
    if (!req.body.deleteValue) {
      await User.updateOne(
        {
          _id: req.user._id, //first we get the concerned user
          'notifications._id': req.params.id //then we get notification array an look to specific notification using id that is present in URL (params)
        },
        {
          $set: { 'notifications.$.read': true } //we are setting value in object notification as read
        }
      )
        .then(() => {
          res.status(HttpStatus.OK).json({ message: 'Marked notification as Read' });
        })
        .catch(err => {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: 'Error Occured when Marking Notification as Read' });
        });
    }
  }
};
