/// <reference path="../../../../../typings/vertx-js/vertx.d.ts" />

var health_check_handler = require("vertx-health-checks-js/health_check_handler");
var HealthChecks = require("vertx-health-checks-js/health_checks");
var Router = require("vertx-web-js/router");
var healthCheckHandler1 = health_check_handler.create(vertx);
var healthCheckHandler2 = health_check_handler.createWithHealthChecks(HealthChecks.create(vertx));

healthCheckHandler1.register("my-procedure-name", function (future) {
  //....
  future.complete(Status.OK(new JsonObject().put("available-memory", "2mb")))
});

healthCheckHandler1.register("complete-with-ko", function (future) {
  future.complete({ ok: false });
  // future.complete({ ok: true });
});

var router = Router.router(vertx);
// Populate the router with routes...
// Register the health check handler
router.get("/health").handler(healthCheckHandler1.handle);

// Or
// router.get("/ping*").handler(healthCheckHandler2.handle);

var server = vertx.createHttpServer();
server.requestHandler(router.accept).listen(5050);
console.log('>>> verticle: now listening on port 5050')

// healthCheckHandler.register("my-procedure-name", future -> {
//   // Do the check ....
//   // Upon success do
//   future.complete(Status.OK());
//   // In case of failure do:
//   future.complete(Status.KO());
// });

// // router.get("/health").handler(healthCheckHandler);

// module.exports = {
//   vertxStartAsync: function (startFuture) {
//     vertx.executeBlocking(function (blockingFuture) {
//       try {
//         var Router = require("vertx-web-js/router");
//         var router = Router.router(vertx);

//         var handler = require("vertx-health-checks-js/health_check_handler").create(vertx);

//         handler.register("complete-with-ok", function (future) {
//           future.complete({ ok: true });
//         });

//         handler.register("complete-with-ko", function (future) {
//           future.complete({ ok: false });
//         });

//         handler.register("complete-with-data", function (future) {
//           future.complete({ ok: true, data: { foo: 'bar' } });
//         });

//         handler.register("complete-with-nothing", function (future) {
//           future.complete();
//         });

//         router.get("/health/*").handler(handler.handle);

//         var server = vertx.createHttpServer();
//         server.requestHandler(router.accept).listen(5050);
//         console.log('>>> verticle: now listening on port 5050')

//         blockingFuture.complete()
//       } catch (error) {
//         blockingFuture.fail(error)
//       }

//     }, function (result, error) {
//       error ? startFuture.fail(error) : startFuture.complete();
//     })
//   },

//   vertxStop: function () {
//     logger.debug('verticle stopped')
//   }
// };
