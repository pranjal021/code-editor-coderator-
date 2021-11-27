const app = require("express")();
const server = require("http").createServer(app);
const options = {
  cors: {
    origins: "*",
  },
};

const io = require("socket.io")(server, options);

let state = {
  files: [
    {
      name: "code.cpp",
      content:
        '#include <iostream>\nusing namespace std\n\nint main()\n{\n cout << "Hello World!" << endl;\n return 0;\n}',
    },
  ],
  active: 0,
  mode: "text/x-c++src",
};

io.on("connection", (socket) => {
  io.emit("broadcast", state);

  socket.on("emit", (arg) => {
    state = arg;
    socket.broadcast.emit("broadcast", state);
  });
});

let port = process.env.PORT || 5500;

server.listen(port, () => {
  console.log("Listening to port " + port);
});