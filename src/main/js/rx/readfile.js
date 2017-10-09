var Rx = require("rx.vertx");
var fs = vertx.fileSystem();
fs.open("/Users/hezhiqiang/totoro/_vertx-projects/vertx3-hello-console/src/rx/data.txt", {}, function (result, err) {
  console.log(result)
  var file = result.result();
  var observable = Rx.Observable.fromReadStream(file);
  observable.forEach(function (data) {
    console.log("Read data: " + data.toString("UTF-8"));
  });
});
