/// <reference path="../../../../../typings/vertx-jdbc-js/jdbc_client.d.ts" />

// var MySQLClient = require("vertx-mysql-postgresql-js/my_sql_client");
var MySQLClient = require("vertx-mysql-postgresql-js/my_sql_client")

var logger = require("../../core/logging/index").logger
var ConfigRetriever = require("vertx-config-js/config_retriever");
var options = {
  "stores": [{
    "type": "file",   // event-bus, http, sys, env, json, file, directory
    "format": "json", // properties
    "config": {
      "path": "./src/main/js/dataaccess/mysql/config.json"
    }
  }]
};

var retriever = ConfigRetriever.create(vertx, options);
retriever.getConfig(function (config, ar_err) {
  if (ar_err != null) {
    logger.error("Error: failed to get database configurations {0}", ar_err)
  } else {
    logger.info("Database configurations: ")
    Object.keys(config).map(function (key) {
      logger.info("{0} = {1}", key, config[key])
    })
    var client = MySQLClient.createShared(vertx, config);
    logger.info("Database client: {0}", client);
    client.getConnection(function (connection, error) {
      logger.info("Connection: {0}", connection)
      if (error == null) {
        connection.query("SELECT id,nickname FROM wechat_user where id = 1", function (result, query_error) {
          connection.close()
          if (query_error == null) {
            // console.log(result.rows)
            logger.info("Result rows: {0}", JSON.stringify(result.rows))
          }
          else {
            // Query error
            logger.error("Query error")
          }
        })

        // connection.query("replace into users(id, username, password, scope) values(1, 'admin1', 'admin1', 'admin1')", function (result, query_error) {
        //   if (query_error == null) {
        //     // console.log(result.rows)
        //     logger.info("Result: {0}", JSON.stringify(result))
        //   }
        //   else {
        //     // Query error
        //     logger.error("Query error")
        //   }
        // })
        // connection.queryWithParams("SELECT CHECK_AGENT_ACCOUNT(?) AS result", ['q31514266'], function (result, query_error) {
        //   if (query_error == null) {
        //     // console.log(result.rows)
        //     logger.info("Result: {0}", JSON.stringify(result))
        //   }
        //   else {
        //     // Query error
        //     logger.error("Query error")
        //   }
        // })

        // connection.callWithParams("call get_user_info(?)", [10000], [null, "INTEGER"], function (res, res_err) {

        //   if (res_err == null) {
        //     var result = res;
        //     logger.info("The result of call procedure: {0}", result)
        //   } else {
        //     logger.error("Call procedure error")
        //   }
        // })

        // connection.callWithParams("{ call get_user_info(?) }", [10000], null, function (result, query_error) {
        //   if (query_error == null) {
        //     console.log(result.rows)
        //     logger.info("Result: {0}", JSON.stringify(result.rows))
        //   }
        //   else {
        //     // Query error
        //     logger.error("Query error")
        //   }
        // })

      }
      else {
        console.error('建立数据库连接错误 %s', error)
      }
    })
  }
});

// var config = {
//   "host": "localhost",
//   "port": 3306,
//   "maxPoolSize": 10,
//   "username": "root",
//   "password": "root",
//   "database": "hierarchy_data",
//   "charset": "UTF-8",
//   "queryTimeout": 10000
// };

// var client = MySQLClient.createShared(vertx, config);
// logger.info("Database client: {0}", client);
// client.getConnection(function (connection, error) {
//   logger.info("Connection: {0}", connection)
//   if (error == null) {
//     connection.query("SELECT id,nickname FROM wechat_user LIMIT 1", function (result, query_error) {
//       if (query_error == null) {
//         // console.log(result.rows)
//         logger.info("Result rows: {0}", JSON.stringify(result.rows))
//       }
//       else {
//         // Query error
//         logger.error("Query error")
//       }
//     })
//   }
//   else {
//     console.error('建立数据库连接错误 %s', error)
//   }
// })




exports.vertxStart = function () {

}

exports.vertxStop = function () {

}
