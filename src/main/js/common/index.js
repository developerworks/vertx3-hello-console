var logger = require("../../core/logging/index").logger

var verticles = [
  "common/qrcode/index.js"
];
for (var i = 0; i < verticles.length; i++) {
  var element = verticles[i];
  logger.info("Starting verticle: " + verticles[i]);
  vertx.deployVerticle(verticles[i]);
}
