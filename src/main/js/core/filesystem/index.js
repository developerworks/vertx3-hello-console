/// <reference path="../../../../../typings/vertx-js/vertx.d.ts" />

var fs = vertx.fileSystem();

// Copy file from foo.txt to bar.txt
fs.copy("foo.txt", "bar.txt", function (res, res_err) {
  if (res_err == null) {
    // Copied ok!
  } else {
    // Something went wrong
  }
});
