vertx.createHttpServer().requestHandler(function (req) {
  req.response()
    .putHeader("content-type", "text/plain")
    .end("Hello World!");
}).listen(8080, function () {
  console.log('Http server is listening on http://localhost:8080')
});
