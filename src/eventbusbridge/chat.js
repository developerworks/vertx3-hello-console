/// <reference path="../../typings/vertx-js/vertx.d.ts" />

var logger = require("../core/logging/index").logger

var Router = require("vertx-web-js/router");
var SockJSHandler = require("vertx-web-js/sock_js_handler");
var StaticHandler = require("vertx-web-js/static_handler");

var router = Router.router(vertx);

// Allow events for the designated addresses in/out of the event bus bridge
var opts = {
  "inboundPermitteds": [
    {
      "address": "chat.to.server"
    }
  ],
  "outboundPermitteds": [
    {
      "address": "chat.to.client"
    }
  ]
};

// 创建事件总线桥, 并添加到路由
var ebHandler = SockJSHandler.create(vertx).bridge(opts);
router.route("/eventbus/*").handler(ebHandler.handle);

// Create a router endpoint for the static content.
// 为静态内容创建一个路由端点
router.route("/static/*").handler(StaticHandler.create().handle);

// Start the web server and tell it to use the router to handle requests.
vertx.createHttpServer().requestHandler(router.accept).listen(8080);

var eb = vertx.eventBus();

// Register to listen for messages coming IN to the server
eb.consumer("chat.to.server").handler(function (message) {
  logger.info("message received: {0}", JSON.stringify(message.body()))
  // Create a timestamp string
  var timestamp = Java.type("java.text.DateFormat")
    .getDateTimeInstance(Java.type("java.text.DateFormat").SHORT, Java.type("java.text.DateFormat").MEDIUM)
    .format(Java.type("java.util.Date").from(Java.type("java.time.Instant").now()));
  // Send the message back out to all clients with the timestamp prepended.
  eb.publish("chat.to.client", timestamp + ": " + message.body());
});

