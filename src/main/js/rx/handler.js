/// <reference path="../../../../node_modules/rx/ts/rx.d.ts" />
var Rx = require("rx.vertx")

var observable = Rx.observableHandler()

observable.subscribe({
  function(evt) {
    // Got event
  }
})

vertx.setTimer(1000, observable.toHandler())
