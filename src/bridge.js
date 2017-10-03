var Router = require("vertx-web-js/router");
var SockJSHandler = require("vertx-web-js/sock_js_handler");

var router = Router.router(vertx);
var options = {
  "outboundPermitteds": [{ "address": "my_message_address" }],
  "inboundPermitteds": [{ "address": "my_message_address" }],
  "pingTimeout": 5000
};
var sockJSHandler = SockJSHandler.create(vertx).bridge(options, function (be) {
  if (be.type() !== 'SOCKET_CREATED' && be.type() !== 'SOCKET_CLOSED') {
    console.log(be.getRawMessage().body)
  } else {
    console.log(be.type)
  }
  be.complete(true);
});
router.route("/eventbus/*").handler(sockJSHandler.handle);
vertx.createHttpServer().requestHandler(router.accept).listen(8080, function () {
  console.log('Socket server is listen on ws://localhost:8080')
});
