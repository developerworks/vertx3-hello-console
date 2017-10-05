// System.setProperty("vertx.logger-delegate-factory-class-name", "io.vertx.core.logging.Log4j2LogDelegateFactory")


// Java.type("java.lang.System").setProperty("vertx.logger-delegate-factory-class-name", "io.vertx.core.logging.Log4j2LogDelegateFactory")
// Java.type("java.lang.System").setProperty("log4j.configurationFile", "/Users/hezhiqiang/totoro/_vertx-projects/vertx3-hello-console/src/logger/log4j2.xml")
var logger = Java.type("io.vertx.core.logging.LoggerFactory").getLogger("poker");
console.log(logger);
logger.info("something happened");
logger.error("oops!");
// var manager = Java.type("org.apache.logging.log4j.LogManager")
// var logger2 = manager.getLogger("logger2")

// logger2.info("logger2 message")



var locale = Java.type("java.util.Locale").getDefault()

logger.info(
  locale.getLanguage(),         // 系统语言
  locale.getCountry(),          // 系统国家设置
  locale.getDisplayLanguage(),  // 显示语言
  locale.getDisplayCountry()    // 显示国家
);


// 设置默认使用英语
Java.type("java.util.Locale").setDefault(Java.type("java.util.Locale").ENGLISH)

// 设置用户语言
Java.type("java.lang.System").setProperty("user.language", "en")


logger.info(
  locale.getLanguage(),
  locale.getCountry(),
  locale.getDisplayLanguage(),
  locale.getDisplayCountry()
);

logger.info('User language: ', Java.type("java.lang.System").getProperty("user.language"))

