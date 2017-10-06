var logger = require("../logging/index").logger

var client = vertx.createDnsClient(53, "8.8.8.8")
client.lookup("totorotec.cn", function (ar, ar_err) {
  if (ar_err == null) {
    logger.info(JSON.stringify(ar))
  } else {
    logger.info("Failed to resolve entry " + ar_err)
  }
})
client.resolveA("vertx.io", function (ar, ar_err) {
  if (ar_err == null) {
    var records = ar
    Array.prototype.forEach.call(records, function (record) {
      logger.info(record)
    })
  } else {
    logger.info("Failed to resolve entry " + ar_err)
  }
})

