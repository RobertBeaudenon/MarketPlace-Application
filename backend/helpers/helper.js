const User = require('../models/userModels');

module.exports = {
  //function that convert username to lowercase then set first letter to uppercase
  firstUpper: username => {
    const name = username.toLowerCase();
    return name.charAt(0).toUpperCase() + name.slice(1);
  },

  lowerCase: str => {
    return str.toLowerCase();
  },

  //When user send another message, chatlist array of receiver must be updated by deleting the previous last message and displaying the new last message in position 0 which means the first one in line
  updateChatList: async (req, message) => {
    await User.update(
      {
        _id: req.user._id
      },
      {
        $pull: {
          chatList: {
            receiverId: req.params.receiver_id
          }
        }
      }
    );

    await User.update(
      {
        _id: req.params.receiver_Id
      },
      {
        $pull: {
          chatList: {
            receiverId: req.user._id
          }
        }
      }
    );

    await User.update(
      {
        _id: req.user._id
      },
      {
        $push: {
          chatList: {
            $each: [
              {
                receiverId: req.params.receiver_Id,
                msgId: message._id
              }
            ],
            $postion: 0
          }
        }
      }
    );

    await User.update(
      {
        _id: req.params.receiver_Id
      },
      {
        $push: {
          chatList: {
            $each: [
              {
                receiverId: req.user._id,
                msgId: message._id
              }
            ],
            $postion: 0
          }
        }
      }
    );
  }
};
