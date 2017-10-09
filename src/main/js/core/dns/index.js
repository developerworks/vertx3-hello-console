/// <reference path="../../../../../typings/vertx-js/vertx.d.ts" />

// JVM内置的DNS解析是阻塞式的.
// 这里我们使用Vertx提供的非阻塞式的方式来解析IP地址

// 导入需要的库
var Vertx = require("vertx-js/vertx")

// 创建Vertx实例
// DNS服务器默认使用53端口, 如果使用非默认端口, 可以设置为HOST:PORT形式的IP地址
var vertx = Vertx.vertx({
  "addressResolverOptions": {
    "servers": [
      "8.8.8.8:53",
      "8.8.4.4:53"
    ]
  }
})

// 有的情况下, 我们需要使用内置的DNS解析器, 在这种情况下, 可以设置系统选项 vertx.disableDnsResolver=true 以启用JVM提供的DNS解析器.


