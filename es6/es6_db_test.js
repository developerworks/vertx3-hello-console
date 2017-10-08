/// <reference path="../typings/vertx-jdbc-js/jdbc_client.d.ts" />
import { logger } from "../src/core/logging/index"
import ConfigRetriever from "vertx-config-js/config_retriever"
// let ConfigRetriever = require("vertx-config-js/config_retriever");
let options = {
  "stores": [{
    "type": "file",   // event-bus, http, sys, env, json, file, directory
    "format": "json", // properties
    "config": {
      "path": "./src/dataaccess/jdbcclient/config.json"
    }
  }]
};
let retriever = ConfigRetriever.create(vertx, options);
let JDBCClient = require("vertx-jdbc-js/jdbc_client");

retriever.getConfig((config, error) => {
  logger.info("============== database configurations: {0}", JSON.stringify(config))
  if (error != null) {
    logger.error("Error: failed to get database configurations {0}", error)
  }
  else {
    let client = JDBCClient.createShared(vertx, config, "MyDataSource");
    client.getConnection((connection, connection_err) => {
      if (connection_err == null) {
        connection.query("SELECT id,nickname FROM wechat_user LIMIT 1", (result, query_error) => {
          if (query_error == null) {
            logger.info("Result rows: {0}", JSON.stringify(result.rows))
          }
          else {
            logger.erorr("Query error")
          }
        })
      }
      else {
        console.error('建立数据库连接错误 %s', connection_err)
      }
    })
  }
})
