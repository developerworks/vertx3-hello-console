var logger = require("../../logger/index").logger
exports.vertxStart = function () {
  // 导入日志对象
  // MySQL 数据库配置
  var database_config = {
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root"
  }
  // 获取共享数据对象
  var sd = vertx.sharedData();
  // 从共享数据对象中获取一个Map, 如果指定名称的Map不存在, 就创建之.
  var map = sd.getLocalMap("mysql");
  logger.info("从共享数据对象中获取一个Map, 如果指定名称的Map不存在, 就创建之 {0}", map)
  logger.info("设置共享数据 {0}", JSON.stringify(database_config))
  map.put("connection", database_config)
  var newmap = map.get("connection")
  logger.info("获取共享数据 {0}", JSON.stringify(newmap))
}

exports.vertxStop = function () {
  logger.info("Verticle is stopped.")
}
