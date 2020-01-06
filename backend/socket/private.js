//we get io from our server.js
module.exports = function(io) {
  //we use the 'on' method to listen for events
  io.on('connection', socket => {
    socket.on('join chat', params => {
      socket.join(params.room1);
      socket.join(params.room2);
      //console.log(params);
    });
    socket.on('start_typing', data => {
      //we are only displaying the istyping in the receiver chat room, we are forwarding to receiver data so that we can know when the sender is typing on keypress
      io.to(data.receiver).emit('is_typing', data);
    });
  });
};
