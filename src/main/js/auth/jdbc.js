var JDBCClient = require("vertx-jdbc-js/jdbc_client");
var JDBCAuth = require("vertx-auth-jdbc-js/jdbc_auth");

/// <reference path="../../../../typings/vertx-auth-jdbc-js/jdbc_auth.d.ts" />

var logger = require("../../core/logging/index").logger
var ConfigRetriever = require("vertx-config-js/config_retriever");
var options = {
  "stores": [{
    "type": "file",   // event-bus, http, sys, env, json, file, directory
    "format": "json", // properties
    "config": {
      "path": "./src/main/js/dataaccess/jdbcclient/config.json"
    }
  }]
};
var retriever = ConfigRetriever.create(vertx, options);

retriever.getConfig(function (config, ar_err) {
  if (ar_err != null) {
    // Failed to retrieve the configuration
    logger.error("Error: failed to get database configurations {0}", ar_err)
  } else {
    var jdbcClient = JDBCClient.createShared(vertx, config, "MyDataSource");
    var authProvider = JDBCAuth.create(vertx, jdbcClient);
  }
});

