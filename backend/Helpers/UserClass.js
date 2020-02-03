class User {
  constructor() {
    //when a user connect to the socket we push him in the array
    this.globalArray = [];
  }

  //when a user log in we call this method
  EnterRoom(id, name, room) {
    const user = { id, name, room };
    this.globalArray.push(user);
    return user;
  }

  GetUserId(id) {
    //returns object of the user from the gloabl array
    const socketId = this.globalArray.filter(userId => userId.id === id)[0];
    return socketId;
  }

  RemoveUser(id) {
    const user = this.GetUserId(id);

    //we return all objects in array except the one of the user that is not online
    if (user) {
      this.globalArray = this.globalArray.filter(userId => userId.id !== id);
    }

    return user;
  }

  GetList(room) {
    const roomName = this.globalArray.filter(user => user.room === room);
    const names = roomName.map(user => user.name);
    //returns an array
    return names;
  }
}

module.exports = { User };
