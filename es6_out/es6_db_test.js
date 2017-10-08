"use strict";

var _index = require("../src/core/logging/index");

var _config_retriever = require("vertx-config-js/config_retriever");

var _config_retriever2 = _interopRequireDefault(_config_retriever);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let ConfigRetriever = require("vertx-config-js/config_retriever");
/// <reference path="../typings/vertx-jdbc-js/jdbc_client.d.ts" />
var options = {
  "stores": [{
    "type": "file", // event-bus, http, sys, env, json, file, directory
    "format": "json", // properties
    "config": {
      "path": "./src/dataaccess/jdbcclient/config.json"
    }
  }]
};
var retriever = _config_retriever2.default.create(vertx, options);
var JDBCClient = require("vertx-jdbc-js/jdbc_client");

retriever.getConfig(function (config, error) {
  _index.logger.info("============== database configurations: {0}", JSON.stringify(config));
  if (error != null) {
    _index.logger.error("Error: failed to get database configurations {0}", error);
  } else {
    var client = JDBCClient.createShared(vertx, config, "MyDataSource");
    client.getConnection(function (connection, connection_err) {
      if (connection_err == null) {
        connection.query("SELECT id,nickname FROM wechat_user LIMIT 1", function (result, query_error) {
          if (query_error == null) {
            _index.logger.info("Result rows: {0}", JSON.stringify(result.rows));
          } else {
            _index.logger.erorr("Query error");
          }
        });
      } else {
        console.error('建立数据库连接错误 %s', connection_err);
      }
    });
  }
});