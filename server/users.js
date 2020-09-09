const Users = [];

const addUser = (userName, roomId, callback) => {
  if (
    Users.filter((user) => {
      user === userName && user.roomId === roomId;
    }) > 0
  ) {
    callback(
      new Error("User with this username already exists ,choose another"),
      null
    );
  } else {
    callback(null, {
      pushUser: () => {
        Users.push({ userName, roomId });
      },
    });
  }
  Users.push({ userName, roomId });
};
const removeUser = (userName, roomId) => {};
module.exports = addUser;
