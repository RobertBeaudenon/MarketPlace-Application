const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema({
  //if a conversation betwen two users doesn't exist add both users in the array, else look for it in the array
  participants: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ]
});

module.exports = mongoose.model('Conversation', ConversationSchema);
