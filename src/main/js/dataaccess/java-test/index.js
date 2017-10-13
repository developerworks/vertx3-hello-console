/// <reference path="../../../../../typings/vertx-js/vertx.d.ts" />

var logger = require("../../core/logging/index").logger



vertx.deployVerticle("cn.totorotec.vertx.verticle.Example", {
  // 传递给被部署的Verticle选项
  "config": {
    "test": "test"
  },
}, function (deployment_id, err) {
  if (err == null) {
    var deployedVerticleIds = vertx.deploymentIDs()
    Array.prototype.forEach.call(deployedVerticleIds, function (id) {
      logger.info(id)
    })
  }
  else {
    logger.info('Deploy failed.', deployment_id, err)
  }
})

