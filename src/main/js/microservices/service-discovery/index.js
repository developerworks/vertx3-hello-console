var ServiceDiscovery = require("vertx-service-discovery-js/service_discovery");
// 使用默认配置创建一个服务发现实例
var discovery = ServiceDiscovery.create(vertx);

// 自定义配置
discovery = ServiceDiscovery.create(vertx, {
  "announceAddress": "service-announce",
  "name": "my-name"
});

// Do something...

discovery.close();
