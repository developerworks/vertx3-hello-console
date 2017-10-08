/// <reference path="../../../typings/vertx-js/vertx.d.ts" />
/**
 * 参考资料:
 *
 * 1. http://tutorials.jenkov.com/vert.x/timers.html
 */


var logger = require("../logging/index").logger

vertx.setTimer(1000, function (id) {
  logger.debug("Run once after 1000 ms.")
})

var count = 0;

logger.debug("Run 10 times, run every 1000 ms")
vertx.setPeriodic(1000, function (id) {
  count = count + 1
  logger.debug("count: {0}", count)
  if (count == 10) {
    vertx.cancelTimer(id)
    logger.info("Timer {0} canceled.", id)
  }
})
