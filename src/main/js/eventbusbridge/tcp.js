/// <reference path="../../../../typings/vertx-js/vertx.d.ts" />

var TcpEventBusBridge = require("vertx-tcp-eventbus-bridge-js/tcp_event_bus_bridge");

var bridge = TcpEventBusBridge.create(vertx, {
  "inboundPermitteds": [{
    "address": "in"
  }],
  "outboundPermitteds": [{
    "address": "out"
  }]
});

bridge.listen(7000, function (res, res_err) {
  if (res_err == null) {
    // succeed...
  } else {
    // fail...
  }
});
