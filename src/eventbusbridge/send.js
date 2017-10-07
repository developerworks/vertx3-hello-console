/// <reference path="../../typings/vertx-js/vertx.d.ts" />

var logger = require("../core/logging/index").logger
var Router = require("vertx-web-js/router");
var SockJSHandler = require("vertx-web-js/sock_js_handler");
var StaticHandler = require("vertx-web-js/static_handler");

var router = Router.router(vertx);
var options = {
  "inboundPermitteds": [
    { "address": "game.server" }
  ],
  "outboundPermitteds": [
    { "address": "game.clients" }
  ],
  "pingTimeout": 3000,      // PING超时, 如果60秒内服务器没有收到客户的PING消息, 则认为客户端断开连接.
  "heartbeatInterval": 1000 // 客户端向服务器发送PING消息的间隔
};
var sockJSHandler = SockJSHandler.create(vertx).bridge(options);
router.route("/eventbus/*").handler(sockJSHandler.handle);
router.route("/static/*").handler(StaticHandler.create().handle);

vertx
  .createHttpServer()
  .requestHandler(router.accept)
  .listen(8080, function () {
    logger.info('Eventbus bridge server is listen on http://localhost:8080')
  });

var eb = vertx.eventBus();
eb.consumer("game.server").handler(function (message) {
  logger.info("received message type: {0}", message.type)
  logger.info("received message address: {0}", message.address())
  logger.info("received message replyAddress: {0}", message.replyAddress())
  logger.info("received message headers: {0}", JSON.stringify(message.headers))
  logger.info("received message: {0}", JSON.stringify(JSON.parse(message.body())))
  eb.send("game.clients", JSON.parse(message.body()));
});
// eb.consumer("ping-server").handler(function (message) {
//   logger.info(message.body());
//   eb.publish("ping-client", message.body());
// })
