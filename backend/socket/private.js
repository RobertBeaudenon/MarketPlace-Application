//we get io from our server.js
module.exports = function(io) {
  //we use the 'on' method to listen for events
  io.on('connection', socket => {
    socket.on('join chat', params => {
      socket.join(params.room1);
      socket.join(params.room2);
      console.log(params);
    });
    //console.log('user connected');
  });
};
