var Rx = require("rx.vertx");
var timer = Rx.Observable.fromReadStream(vertx.periodicStream(1000));
timer.subscribe(function (id) {
  console.log("Callback after 1 second %s", id);
});
