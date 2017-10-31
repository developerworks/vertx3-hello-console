var CircuitBreaker = require("vertx-circuit-breaker-js/circuit_breaker");
var breaker = CircuitBreaker.create("my-circuit-breaker", vertx, {
  "maxFailures": 5,
  "timeout": 2000,
  "fallbackOnFailure": true,
  "resetTimeout": 10000
});

breaker.execute(function (future) {
  // some code executing with the breaker
  // the code reports failures or success on the given future.
  // if this future is marked as failed, the breaker increased the
  // number of failures
  // 如果Future标记为失败, 断路器增加失败数量
}).setHandler(function (ar, ar_err) {
  // Get the operation result.
});
