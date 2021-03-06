const HttpStatus = require('http-status-codes');

const Message = require('../models/messageModels');
const Conversation = require('../models/conversationModels');
const User = require('../models/userModels');
const Helper = require('../Helpers/helper');

module.exports = {
  /***Get messages**/
  async GetAllMessages(req, res) {
    const { sender_Id, receiver_Id } = req.params;
    const conversation = await Conversation.findOne({
      $or: [
        {
          $and: [{ 'participants.senderId': sender_Id }, { 'participants.receiverId': receiver_Id }]
        },
        {
          $and: [{ 'participants.senderId': receiver_Id }, { 'participants.receiverId': sender_Id }]
        }
      ]
    }).select('_id'); //we select only the id to be returned
    //if a result exist
    if (conversation) {
      const messages = await Message.findOne({ conversationId: conversation._id });
      res.status(HttpStatus.OK).json({ message: 'Messages returned', messages });
    }
  },

  /***SEND a MESSAGE**/
  SendMessage(req, res) {
    const { sender_Id, receiver_Id } = req.params;

    //1st we check if a conversation already exist between the two users, byy looking in array of participants
    Conversation.find(
      {
        $or: [
          { participants: { $elemMatch: { senderId: sender_Id, receiverId: receiver_Id } } },
          { participants: { $elemMatch: { senderId: receiver_Id, receiverId: sender_Id } } }
        ]
      },
      async (err, result) => {
        //a conversation exist between both users
        if (result.length > 0) {
          //holds the object becaue we use findone
          const msg = await Message.findOne({ conversationId: result[0]._id });
          Helper.updateChatList(req, msg);
          await Message.update(
            {
              conversationId: result[0]._id
            },
            {
              $push: {
                message: {
                  senderId: req.user._id,
                  receiverId: req.params.receiver_Id,
                  senderName: req.user.username,
                  receiverName: req.body.receiverName,
                  body: req.body.message
                }
              }
            }
          )
            .then(() => res.status(HttpStatus.OK).json({ message: 'Message sent to conversation that already exist' }))
            .catch(err =>
              res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: 'Error occurend when sending a message to a conversation that already exist' })
            );
        } else {
          //this else statement will only be executed once to initilaize conversation between the two users
          //we create a new instance of conversation and push both values in array
          const newConversation = new Conversation();
          newConversation.participants.push({
            senderId: req.user._id,
            receiverId: req.params.receiver_Id
          });

          const saveConversation = await newConversation.save();

          //Then we add conversation id that we created in message array in message schema
          const newMessage = new Message();
          newMessage.conversationId = saveConversation._id;
          newMessage.sender = req.user.username;
          newMessage.receiver = req.body.receiverName;
          newMessage.message.push({
            senderId: req.user._id,
            receiverId: req.params.receiver_Id,
            senderName: req.user.username,
            receiverName: req.body.receiverName,
            body: req.body.message
          });

          //update for both users chatlist to know how many user a particular user is having a conversation with
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
                      msgId: newMessage._id
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
                      msgId: newMessage._id
                    }
                  ],
                  $postion: 0
                }
              }
            }
          );

          await newMessage
            .save()
            .then(() => res.status(HttpStatus.OK).json({ message: 'Message sent' }))
            .catch(err =>
              res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occurend when sending a message' })
            );
        }
      }
    );
  },

  async MarkReceiverMessages(req, res) {
    const { sender, receiver } = req.params;
    //agregate returns an array
    const msg = await Message.aggregate([
      //unwind is used to transfrom the output of the array which are [objects] into their content
      { $unwind: '$message' },
      {
        $match: {
          $and: [{ 'message.senderName': receiver, 'message.receiverName': sender }]
        }
      }
    ]);
    if (msg.length > 0) {
      try {
        msg.forEach(async value => {
          await Message.update(
            {
              'message._id': value.message._id
            },
            { $set: { 'message.$.isRead': true } }
          );
        });
        res.status(HttpStatus.OK).json({ message: 'Messages marked as read' });
      } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occured when messages marked as read' });
      }
    }
  },

  async MarkAllMessages(req, res) {
    //agregate returns an array
    const msg = await Message.aggregate([
      { $match: { 'message.receiverName': req.user.username } },
      { $unwind: '$message' },
      { $match: { 'message.receiverName': req.user.username } }
    ]);

    if (msg.length > 0) {
      try {
        msg.forEach(async value => {
          await Message.update(
            {
              'message._id': value.message._id
            },
            { $set: { 'message.$.isRead': true } }
          );
        });
        res.status(HttpStatus.OK).json({ message: 'All Messages marked as read' });
      } catch (err) {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error occured when all messages marked as read' });
      }
    }
  }
};
