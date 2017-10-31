/// <reference path="../../../../../typings/vertx-js/vertx.d.ts" />

var ConfigRetriever = require("vertx-config-js/config_retriever");
var logger = require("../../core/logging/index").logger


var KubernetesConfigMapStore = {
  "type": "configmap",
  "config": {
    "namespace": "my-project-namespace",
    "name": "configmap-name"
  }
};

var GitStore = {
  "type": "git",
  "config": {
    "url": "https://github.com/cescoffier/vertx-config-test.git",
    "path": "local",
    "filesets": [{
      "pattern": "*.json"
    }]
  }
};

var HttpStore = {
  "type": "http",
  "config": {
    "host": "localhost",
    "port": 8080,
    "path": "/conf"
  }
};

// 文件路径可以使基于当前启动目录的相对目录
var FileStore = {
  "type": "file",
  "config": {
    "path": "./src/microservices/config/mysql-config.json"
  }
};

var SysPropsStore = {
  "type": "sys"
};


var options = {
  "stores": [
    // HttpStore,
    FileStore,
    // SysPropsStore,
    // GitStore
  ]
};

var retriever = ConfigRetriever.create(vertx, options);


// 从配置的多个存储中获取配置, 并且合并配置. stores 列表中, 排在后面的存储会覆盖前面的存储.
retriever.getConfig(function (ar, ar_err) {
  if (ar_err != null) {
    // Failed to retrieve the configuration
  } else {
    var config = ar;
    // logger.info(JSON.stringify(config))
    // logger.info('host {0}', config.host)
    // logger.info('port {0}', config.port) // 端口号使用String类型, 如果是Int类型, 打印出来是 3,306这种格式, 端口号不用于数值计算, 因此在配置文件中使用字符串.
    // logger.info('username {0}', config.username)
    // logger.info('password {0}', config.password)
    Object.keys(config).map(function (key) {
      logger.info("{0} = {1}", key, config[key])
    })
  }
});
