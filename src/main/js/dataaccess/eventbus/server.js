/// <reference path="../../../../../typings/vertx-js/vertx.d.ts" />

var logger = require("../../core/logging/index").logger

var Router = require("vertx-web-js/router");
var SockJSHandler = require("vertx-web-js/sock_js_handler");

var router = Router.router(vertx);
var options = {
  "inboundPermitteds": [
    { "address": "service.db" }
  ],
  "outboundPermitteds": [
    { "address": "db.client" }
  ],
  "pingTimeout": 3000,      // PING超时, 如果60秒内服务器没有收到客户的PING消息, 则认为客户端断开连接.
  "heartbeatInterval": 1000 // 客户端向服务器发送PING消息的间隔
};
var sockJSHandler = SockJSHandler.create(vertx).bridge(options);
router.route("/service/db/*").handler(sockJSHandler.handle);

var server_options = {
  "logActivity": true,
  "keepAlive": true,
  "protocolVersion": "HTTP_2",
  "ssl": false,
  "useAlpn": true,
  "trustAll": true,
  "decompressionSupported": true, // 支持服务器端解压,
  "idleTimeout": 100,             // 连接在指定的时间内没有活动, 自动关闭连接, 0表示不超时
}
var server = vertx.createHttpServer(server_options).requestHandler(router.accept)

// 连接建立回调
// server.connectHandler(function (socket) {
//  socket 是一个 NetSocket 实例: http://vertx.io/docs/jsdoc/module-vertx-js_net_socket-NetSocket.html
// })
// 连接关闭回调
// server.closeHandler(function (v) {
//   console.log("The socket has been closed");
// })

server.requestHandler(function (request) {
  console.log("version:", request.version())
  console.log("method:", request.method())
  console.log("request uri:", request.uri())
  console.log("request path:", request.path())
  console.log("remoteAddress:", request.remoteAddress())
  console.log("localAddress:", request.localAddress())
  console.log("request uri:", request.uri())
  // 请求处理
  // request.handler(function (buffer) {
  //   console.log(buffer)
  // })
})

// 监听特定端口
server.listen(8080, function () {
  console.log('Eventbus bridge server is listen on http://localhost:8080')
});
// 监听随机端口
// server.listen(0, function () {
//   console.log('Eventbus bridge server is listen on http://localhost:' + server.actualPort())
// });

// TODO: 升级连接到SSL/TLS
// http://vertx.io/docs/vertx-core/js/#_upgrading_connections_to_ssl_tls

var eb = vertx.eventBus();
eb.consumer("service.db").handler(function (message) {
  logger.info("message headers: {0}", JSON.stringify(message.headers()))
  logger.info("message body: {0}", message.body())

  eb.send("db.client", message.body(), {
    headers: {
      operation: "getUserResult"
    }
  });
  // message.reply(message.body(), function (message, error) {
  //   if (error == null) {
  //     console.log(message)
  //   }
  //   else {
  //     console.error(error)
  //   }
  // })
});
