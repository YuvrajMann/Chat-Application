const Users = [];

const addUser = (userName, roomId, callback) => {
  if (
    Users.filter((user) => {
      return user.userName === userName && user.roomId === roomId;
    }).length > 0
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
};
const getUsers = () => {
  return Users;
};

const removeUser = (userName, roomId, callback) => {
  if (
    Users.filter((user) => {
      return user.userName === userName && user.roomId === roomId;
    }).length == 0
  ) {
    callback(
      new Error("User with this username donot exists,choose another"),
      null
    );
  } else {
    callback(null, {
      remove_user: () => {
        const conditioner = (user) => {
          return user.userName === userName && user.roomId === user.roomId;
        };
        let index = Users.findIndex(conditioner);
        console.log(index);
        if (index > -1) {
          Users.splice(index, 1);
        }
      },
    });
  }
};
module.exports = { addUser, getUsers, removeUser };
