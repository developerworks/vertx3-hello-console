/// <reference path="../../../typings/vertx-js/vertx.d.ts" />

// var Router = require("vertx-web-js/router");
// var SockJSHandler = require("vertx-web-js/sock_js_handler");
// var router = Router.router(vertx);
// var options = {
//   "heartbeatInterval": 2000
// };
// var sockJSHandler = SockJSHandler.create(vertx, options);
// router.route("/ws").handler(sockJSHandler.handle);

var Router = require("vertx-web-js/router");
var SockJSHandler = require("vertx-web-js/sock_js_handler");
var router = Router.router(vertx);
var options = {
  "heartbeatInterval": 2000
};
var sockJSHandler = SockJSHandler.create(vertx, options);
sockJSHandler.socketHandler(function (sockJSSocket) {
  // Just echo the data back
  sockJSSocket.handler(sockJSSocket.write);
});
router.route("/ws/*").handler(sockJSHandler.handle);


vertx.createHttpServer().requestHandler(router.accept).listen(8080, function () {
  console.log('Socket server is listen on ws://localhost:8080')
});
