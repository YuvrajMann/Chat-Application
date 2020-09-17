var app = require("express")();
var http = require("http");
const hostName = "localhost";
const portNumber = "5000";
var server = http.createServer(app);
const io = require("socket.io")(server);
const Users = require("./users");
const cors=require('cors');
app.use('cors');
io.on("connection", (socket) => {
  socket.on("join", ({ userName, roomId }) => {
    socket.join(roomId);
    Users.addUser(userName, roomId, (err, push_user) => {
      if (!err) {
        push_user.pushUser();
        console.log(`${userName} joined the room ${roomId}`);
        socket.emit("newUser", {
          userName: userName,
          roomId: roomId,
          msg: `${userName} you are connected to the room ${roomId}`,
        });
        socket.to(roomId).broadcast.emit("newUser", {
          userName: userName,
          roomId: roomId,
          msg: `${userName} joined the room`,
        });
        console.log(Users.getUsers());
      } else {
        console.log(`${userName} can't join the room ${roomId} ${err}`);
      }
    });

    socket.on("disconnect", () => {
      Users.removeUser(userName, roomId, (err, remove_user) => {
        if (err) {
          console.log(`${err}`);
        } else {
          remove_user.remove_user();
          console.log(`${userName} disconnected from room ${roomId}`);
          socket.to(roomId).broadcast.emit("chat-message", {
            userName: "admin",
            chatMessage: `${userName} left the room`,
          });
        }
      });
    });
  });

  socket.on("chat-message", ({ userName, message, roomId }) => {
    socket.to(roomId).broadcast.emit("chat-message", {
      userName: userName,
      chatMessage: message,
    });
  });

  socket.on("getParticipants", () => {
    socket.emit("getParticipants", Users.getUsers());
  });
});

server.listen(portNumber, () => {
  console.log(`listening on http://${hostName}:${portNumber}`);
});
