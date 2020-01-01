const mongoose = require('mongoose');

//structure of task info in DB
const taskSchema = mongoose.Schema({
  taskOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userDoingTask: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, //id of post on which the request was made
  username: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Task', taskSchema);
