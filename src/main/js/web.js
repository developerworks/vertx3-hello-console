/// <reference path="../../../typings/vertx-js/vertx.d.ts" />

var Router = require("vertx-web-js/router");
var server = vertx.createHttpServer();

var router = Router.router(vertx);

router.get("/").handler(function (ctx) {
  // This handler will be called for "/" requests
  var response = ctx.response();
  response.putHeader("content-type", "text/plain");

  // Write to the response and end it
  response.end("Hello World!");
});

server.requestHandler(router.accept).listen(8080);
