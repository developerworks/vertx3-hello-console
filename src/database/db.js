/// <reference path="../../typings/vertx-jdbc-js/jdbc_client.d.ts" />

var JDBCClient = require("vertx-jdbc-js/jdbc_client");
var client = JDBCClient.createShared(vertx, {
  "provider_class": "io.vertx.ext.jdbc.spi.impl.C3P0DataSourceProvider",
  "row_stream_fetch_size": 128,
  "url": "jdbc:mysql://localhost:3306/hierarchy_data?useSSL=false",
  "driver_class": "com.mysql.jdbc.Driver",
  "user": "root",
  "password": "root",
  "max_pool_size": 15,
  "min_pool_size": 1,
  "max_statements": 100,
  "max_statements_per_connection": 10,
  "max_idle_time": 0
}, "MyDataSource");
client.getConnection(function (connection, connection_err) {
  if (connection_err == null) {
    connection.query("SELECT id,nickname FROM wechat_user LIMIT 1", function (result, query_error) {
      if (query_error == null) {
        console.log(result.rows)
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

