var logger = require("./index").logger

module.exports = {
  vertxStart: function () {
    logger.info('Starting test verticle in npm project.')
  },

  vertxStop: function () {
    logger.info("Stopping test verticle in npm project.");
  }
};

