var Router = require("vertx-web-js/router");
var SockJSHandler = require("vertx-web-js/sock_js_handler");
var router = Router.router(vertx);
var options = {
  "heartbeatInterval": 2000
};
var sockJSHandler = SockJSHandler.create(vertx, options);
router.route("/ws").handler(sockJSHandler.handle);
// var options = {
//   "outboundPermitteds": [{ "address": "draw" }],
//   "inboundPermitteds": [{ "address": "draw" }]
// };
// router.route("/eventbus/*").handler(SockJSHandler.create(vertx).bridge(options).handle);
vertx.createHttpServer().requestHandler(router.accept).listen(8080, function () {
  console.log('Socket server is listen on ws://localhost:8080')
});
