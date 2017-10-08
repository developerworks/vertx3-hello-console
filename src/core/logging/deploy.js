/// <reference path="../../../typings/vertx-js/vertx.d.ts" />

var logger = require("./index").logger
// 项目根目录
var PROJECT_DIR = Java.type("java.lang.System").getProperty("user.dir");
// 设置CLASSPATH
// var classpath = Java.type("java.lang.System").getProperty("java.class.path")
// Java.type("java.lang.System").setProperty("java.class.path", PROJECT_DIR + "/src/conf" + classpath)

// // 设置默认使用英语
// Java.type("java.util.Locale").setDefault(Java.type("java.util.Locale").ENGLISH)
// // 设置用户语言
// Java.type("java.lang.System").setProperty("user.language", "en")
// 设置日志配置文件
// Java.type("java.lang.System").setProperty("java.util.logging.config.file", PROJECT_DIR + "/src/conf/logging.properties")


// 获取 Logger
// var logger = Java.type("io.vertx.core.logging.LoggerFactory").getLogger("poker");
// var classpath = Java.type("java.lang.System").getProperty("java.class.path")
// logger.info(classpath)
// var classpaths = classpath.split(":")
// for (var i = 0; i < classpaths.length; i++) {
//   logger.info(classpaths[i])
// }
// logger.info(PROJECT_DIR + "/src/conf/logging.properties")


vertx.deployVerticle("test.js", {
  // 传递给被部署的Verticle选项
  "config": {
    "project_dir": PROJECT_DIR
  },
  // ha: false,                                // 高可用开关
  // instances: 1,                             // 部署的实例数量
  // multiThreaded: false,                     // 多线程开关
  // worker: false,                            // Worker 模式的Verticle
  // workerPoolName: "LoggerWorkerPoll",       // Worker 线程池名称
  // workerPoolSize: 10,                       // 设置由 Vert.x 实例使用的最大 Worker 线程的数量
  // extraClasspath: PROJECT_DIR + "/src/conf" // 附加的CLASSPATH
}, function (deployment_id, err) {
  if (err == null) {
    var deployedVerticleIds = vertx.deploymentIDs()
    Array.prototype.forEach.call(deployedVerticleIds, function (id) {
      logger.info(id)
    })
  }
  else {
    logger.info('Deploy failed.', deployment_id, err)
  }
})

