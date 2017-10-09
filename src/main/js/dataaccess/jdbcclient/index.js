/// <reference path="../../../../../typings/vertx-js/vertx.d.ts" />

var logger = require("../../core/logging/index").logger
var ConfigRetriever = require("vertx-config-js/config_retriever");
var options = {
  "stores": [{
    "type": "file",   // event-bus, http, sys, env, json, file, directory
    "format": "json", // properties
    "config": {
      "path": "./src/dataaccess/jdbcclient/config.json"
    }
  }]
};
var retriever = ConfigRetriever.create(vertx, options);
var JDBCClient = require("vertx-jdbc-js/jdbc_client");

retriever.getConfig(function (config, ar_err) {
  if (ar_err != null) {
    // Failed to retrieve the configuration
    logger.error("Error: failed to get database configurations {0}", ar_err)
  } else {
    // logger.info(JSON.stringify(config))
    // logger.info('host {0}', config.host)
    // logger.info('port {0}', config.port) // 端口号使用String类型, 如果是Int类型, 打印出来是 3,306这种格式, 端口号不用于数值计算, 因此在配置文件中使用字符串.
    // logger.info('username {0}', config.username)
    // logger.info('password {0}', config.password)
    // Object.keys(config).map(function (key) {
    //   logger.info("{0} = {1}", key, config[key])
    // })
    var client = JDBCClient.createShared(vertx, config, "MyDataSource");

    client.getConnection(function (connection, connection_err) {
      if (connection_err == null) {
        connection.query("SELECT id,nickname FROM wechat_user LIMIT 1", function (result, query_error) {
          if (query_error == null) {
            // console.log(result.rows)
            logger.info("Result rows: {0}", JSON.stringify(result.rows))
          }
          else {
            // Query error
          }
        })
      }
      else {
        console.error('建立数据库连接错误 %s', connection_err)
      }
    })
  }
});





exports.vertxStart = function () {

}

exports.vertxStop = function () {

}
