// 以编程的方式实现事件总线的汲取

var Vertx = require("vertx-js/vertx")

// 集群模式下的事件总线需要在集群中的所有节点有相同的配置
// 要在集群模式下强制使用安全, 必须配置集群管理器使用加密或强制安全. 参考集群管理器文档了解细节.
var options = {
  "eventBusOptions": {
    // "clusterPublicHost": "",
    // "clusterPublicPort" : 1234,
    "ssl": false,
    "keyStoreOptions": {
      "path": "keystore.jks",
      "password": "wibble"
    },
    "trustStoreOptions": {
      "path": "keystore.jks",
      "password": "wibble"
    },
    "clientAuth": "REQUIRED"
  }
};
Vertx.clusteredVertx(options, function (res, res_err) {
  if (res_err == null) {
    var vertx = res
    var event_bus = vertx.eventBus()
    console.log('We not have a clustered event bus: ' + event_bus)
  }
  else {
    console.error("Failed; " + res_err)
  }
})
