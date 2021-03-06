//we get io from our server.js
module.exports = function(io, User, _) {
  const userData = new User();

  //we use the 'on' method to listen for events
  io.on('connection', socket => {
    socket.on('refresh', data => {
      //event name 'refresh'
      //console.log(data);
      io.emit('refreshPage', {}); //event name refreshPage, passing an emtpy object, all clinets connected will listen to the event, you can listen to it on any page using the socket.io url
    });

    socket.on('online', data => {
      socket.join(data.room);
      userData.EnterRoom(socket.id, data.user, data.room);
      const list = userData.GetList(data.room);
      //send the set of users in room
      io.emit('usersOnline', _.uniq(list));
    });

    socket.on('disconnect', () => {
      const user = userData.RemoveUser(socket.id);
      //console.log(user);
      if (user) {
        const userArray = userData.GetList(user.room);
        const arr = _.uniq(userArray);
        //console.log(arr);
        //to double verufy that the user is not here
        _.remove(arr, n => n === user.name);
        io.emit('usersOnline', arr);
      }
    });
  });
};
