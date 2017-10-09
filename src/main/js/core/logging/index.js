/// <reference path="../../../../../typings/vertx-js/vertx.d.ts" />

// 获取Context对象的两种方式
// 一. Vertx.currentContext().config()     其中 Vertx 首字母大写
// 二. vertx.getOrCreateContext().config() 其中 vertx 首字母小写
var configs = Vertx.currentContext().config()
// 项目根目录
var PROJECT_DIR = java.lang.System.getProperty("user.dir")
// 设置默认使用英语
java.util.Locale.setDefault(java.util.Locale.ENGLISH)
// 设置用户语言
java.lang.System.setProperty("user.language", "en")

// 设置日志配置文件
// Java.type("java.lang.System").setProperty("java.util.logging.config.file", PROJECT_DIR + "/src/conf/vertx-default-jul-logging.properties")
// java.lang.System.setProperty("java.util.logging.config.file", PROJECT_DIR + "/src/conf/logging.properties")



// 设置CLASSPATH
// var classpath = java.lang.System.getProperty("java.class.path")
// java.lang.System.setProperty("java.class.path", PROJECT_DIR + "/src/conf" + classpath)
// Java.type("java.lang.System").setProperty("vertx.logger-delegate-factory-class-name", "io.vertx.core.logging.Log4j2LogDelegateFactory")
var logger = Java.type("io.vertx.core.logging.LoggerFactory").getLogger("poker");
// var logger = io.vertx.core.logging.LoggerFactory.getLogger("poker")
// logger.info('test')
// logger.info('Project diectory: {0}', PROJECT_DIR)
// logger.info('Context configurations: {0}', JSON.stringify(configs))
// logger.info('Java classpath: {0}', java.lang.System.getProperty('java.class.path'))
// logger.info('$HOME = {0}', java.lang.System.getenv("HOME"))
// logger.info('test')
// logger.info('test')
// var locale = Java.type("java.util.Locale").getDefault()
// logger.info(
//   locale.getLanguage(),         // 系统语言
//   locale.getCountry(),          // 系统国家设置
//   locale.getDisplayLanguage(),  // 显示语言
//   locale.getDisplayCountry()    // 显示国家
// );

exports.logger = logger
