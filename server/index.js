var app = require("express")();
var http = require("http");
const hostName = "localhost";
const portNumber = "5000";
var server = http.createServer(app);
const io = require("socket.io")(server);
// const addUser = require("./users");

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("join", ({ userName, roomId }) => {
    socket.join(roomId);
    // addUser(userName, roomId);
    console.log(`${userName} joined the room ${roomId}`);
    socket.emit("newUser", {
      userName: userName,
      roomId: roomId,
      msg: `${userName} you are connected to the room ${roomId}`,
    });
    socket.to(roomId).broadcast.emit("newUser", {
      userName: userName,
      roomId: roomId,
      msg: `${userName} joined the room ${roomId}`,
    });
  });
  socket.on("chat-message", ({ userName, message, roomId }) => {
    socket.to(roomId).broadcast.emit("chat-message", {
      userName: userName,
      chatMessage: message,
    });
  });
  socket.on("disconnect", () => {});
});

server.listen(portNumber, () => {
  console.log(`listening on http://${hostName}:${portNumber}`);
});
