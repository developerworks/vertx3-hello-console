/// <reference path="../../../typings/vertx-js/vertx.d.ts" />

var server = vertx.createNetServer();
server.connectHandler(function (socket) {
  socket.write("Hello World!\n");
  socket.close();
});

server.listen(7000, "localhost");
