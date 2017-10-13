/// <reference path="../../../../typings/vertx-js/vertx.d.ts" />

var logger = require("../core/logging/index").logger

exports.vertxStart = function () {
  logger.info("Starting verticle: systeminfo")
  logger.info("cluster: {0}", vertx.isClustered())
}

exports.vertxStop = function () {
  logger.info("Stopping verticle: systeminfo")
}
