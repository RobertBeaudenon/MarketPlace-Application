//we get io from our server.js
module.exports = function(io) {
  //we use the 'on' method to listen for events
  io.on('connection', socket => {
    socket.on('refresh', data => {
      //event name 'refresh'
      //console.log(data);
      io.emit('refreshPage', {}); //event name refreshPage, passing an emtpy object, all clinets connected will listen to the event, you can listen to it on any page using the socket.io url
    });
    //console.log('user connected');
  });
};
