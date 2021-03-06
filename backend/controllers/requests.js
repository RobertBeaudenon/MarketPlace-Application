const HttpStatus = require('http-status-codes');

const User = require('../models/userModels');
const Post = require('../models/postModels');
const Task = require('../models/taskModels');

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

      /******* Send notification to user whos request was rejected *******/
      await User.update(
        {
          _id: req.body.userRequested //we look for the user that was rejected
        },
        {
          $push: {
            notifications: {
              senderId: req.user._id,
              message: `${req.user.username} rejected your request.`,
              created: new Date(),
              viewProfile: false
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

  /*****Clean website when user accept an application*** */

  CleanWebsite(req, res) {
    //different way of using async await
    const CleanWebsite = async () => {
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
    CleanWebsite()
      .then(() => {
        res.status(HttpStatus.OK).json({ message: 'You Cleaned the Application' });
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occured when Cleaning the application' });
      });
  },

  /***** Mark a Notification as Read ****/
  async MarkNotification(req, res) {
    //if the optional parameter is not present in body, we mark the notification as read
    if (!req.body.deleteValue) {
      await User.updateOne(
        {
          _id: req.user._id, //first we get the concerned user
          'notifications._id': req.params.id //then we get notification array an look to specific notification using id that is present in URL (params)
        },
        {
          $set: { 'notifications.$.read': true } //we are setting value in object notification as read for one element
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
    } else {
      //we delete the notification, if optional var is set to true
      await User.update(
        {
          _id: req.user._id,
          'notifications._id': req.params.id
        },
        {
          $pull: {
            notifications: { _id: req.params.id }
          }
        }
      )
        .then(() => {
          res.status(HttpStatus.OK).json({ message: 'Deleted notification' });
        })
        .catch(err => {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occured when Deleting Notification ' });
        });
    }
  },

  /***** Mark all Notifications as Read ****/
  async MarkAllNotifications(req, res) {
    await User.update(
      {
        _id: req.user._id //retreiving the corresponding document
      },
      {
        $set: { 'notifications.$[elem].read': true } //we are setting value in object notification as read for multiple element
      },
      {
        arrayFilters: [{ 'elem.read': false }],
        multi: true //All element in array that we find as false we set them as true using the set property above
      }
    )
      .then(() => {
        res.status(HttpStatus.OK).json({ message: 'All Notifications are marked as read' });
      })
      .catch(err => {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error Occured when Marking all notifications as read ' });
      });
  },

  /******* Create a Task *******/

  AddTask(req, res) {
    //Create new structure of object that will be inserted in DB
    const newBody = {
      //remember that in our request we always pass the 'user' object that contains the details
      taskOwner: req.user._id,
      userDoingTask: req.body.userDoingTask,
      postId: req.body.postId,
      created: new Date()
    };

    //We use the mongoose build in method to insert the taks in the DB
    Task.create(newBody)
      .then(async task => {
        //When we create a new task we get the users related to that task and add that task to the array of taks related to that users, (update is form mongoose)

        await User.update(
          {
            _id: req.user._id
          },
          {
            $push: {
              tasks: {
                taskId: task._id,
                userDoingTaskUsername: req.body.userDoingTaskUsername,
                taskOwnerUsername: req.user.username,
                createdAt: new Date()
              }
            }
          }
        );

        await User.update(
          {
            _id: req.body.userDoingTask
          },
          {
            $push: {
              tasks: {
                taskId: task._id,
                userDoingTaskUsername: req.body.userDoingTaskUsername,
                taskOwnerUsername: req.user.username,
                createdAt: new Date()
              },
              notifications: {
                senderId: req.user._id,
                message: `Congrats, ${req.user.username} has accepted your application! You've been assigned to the task.`,
                created: new Date(),
                viewProfile: false
              }
            }
          }
        );

        await Post.update(
          {
            _id: req.body.postId //we find the post by id
          },
          {
            $set: { assigned: true } //we are setting value in object post as assigned
          }
        );

        res.status(HttpStatus.OK).json({ message: 'Added Task to both users', task });
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occured when adding task' });
      });
  },

  /***** Mark Task as completed ****/

  MarkTask(req, res) {
    const MarkTask = async () => {
      await Task.update(
        {
          _id: req.params.id //we find the post by id
        },
        {
          $set: { completed: true } //we are setting value in object post as assigned
        }
      );

      await User.update(
        {
          _id: req.body.userDoingTask
        },
        {
          $inc: { totalTasksCompleted: 1 }
        }
      );

      /******* Send notification to user whos request was rejected *******/
      await User.update(
        {
          _id: req.body.userDoingTask //we look for the user that was rejected
        },
        {
          $push: {
            notifications: {
              senderId: req.user._id,
              message: `${req.user.username} has marked the task as complete.`,
              created: new Date(),
              viewProfile: false
            }
          }
        }
      );
    };

    MarkTask()
      .then(() => {
        res.status(HttpStatus.OK).json({ message: 'You Marked a task as Complete' });
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occured when marking a task as complete' });
      });
  }
};
