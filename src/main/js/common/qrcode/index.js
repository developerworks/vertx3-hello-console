/// <reference path="../../../../../typings/vertx-js/vertx.d.ts" />
var QRCode = require("qrcode");

var logger = require("../../core/logging/index").logger

var Router = require("vertx-web-js/router");
var SockJSHandler = require("vertx-web-js/sock_js_handler");
var StaticHandler = require("vertx-web-js/static_handler");

var router = Router.router(vertx);
var options = {
  "inboundPermitteds": [
    { "address": "common.server" }
  ],
  "outboundPermitteds": [
    { "address": "common.client" }
  ],
  "pingTimeout": 3000,      // PING超时, 如果60秒内服务器没有收到客户的PING消息, 则认为客户端断开连接.
  "heartbeatInterval": 1000 // 客户端向服务器发送PING消息的间隔
};
var sockJSHandler = SockJSHandler.create(vertx).bridge(options);
router.route("/common/qrcode/*").handler(sockJSHandler.handle);

vertx
  .createHttpServer()
  .requestHandler(router.accept)
  .listen(8080, function () {
    console.log('Eventbus bridge server is listen on http://localhost:8080')
  });

var eb = vertx.eventBus();
eb.consumer("common.server").handler(function (message) {

  logger.info("body: {0}", message.body())
  logger.info("received message: {0}", JSON.stringify(message.body()))
  var body = message.body()

  var response = {}

  // if (body.action == "qrcode") {
  //   QRCode.toDataURL(body.url, function (err, data) {
  //     if (err) {
  //       response.code = -1
  //       respnose.message = err
  //       eb.publish("common.client", response);
  //     }
  //     else {
  //       response.code = 0
  //       response.data = data
  //       eb.publish("common.client", response);
  //     }
  //   })
  // }
  // else {
  //   response.code = -1
  //   response.message = "Not implemented."
  //   eb.publish("common.client", response);
  // }

});
