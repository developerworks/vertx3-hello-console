/// <reference path="../../../../../typings/vertx-js/vertx.d.ts" />

var Vertx = require("vertx-js/vertx");
var options = {
  "eventBusOptions": {
    "ssl": true,
    "keyStoreOptions": {
      "path": "keystore.jks",
      "password": "wibble"
    },
    "trustStoreOptions": {
      "path": "keystore.jks",
      "password": "wibble"
    },
    "clientAuth": "REQUIRED"
  }
};

Vertx.clusteredVertx(options, function (res, res_err) {
  if (res_err == null) {
    var vertx = res;
    var eventBus = vertx.eventBus();
    console.log("We now have a clustered event bus: " + eventBus);
  } else {
    console.log("Failed: " + res_err);
  }
});
