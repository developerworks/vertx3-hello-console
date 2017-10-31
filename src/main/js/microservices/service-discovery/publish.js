var HttpEndpoint = require("vertx-service-discovery-js/http_endpoint");
// Manual record creation
var record = {
  "type": "eventbus-service-proxy",
  "location": {
    "endpoint": "the-service-address"
  },
  "name": "my-service",
  "metadata": {
    "some-label": "some-value"
  }
};

discovery.publish(record, function (ar, ar_err) {
  if (ar_err == null) {
    // publication succeeded
    var publishedRecord = ar;
  } else {
    // publication failed
  }
});

// Record creation from a type
record = HttpEndpoint.createRecord("some-rest-api", "localhost", 8080, "/api");
discovery.publish(record, function (ar, ar_err) {
  if (ar_err == null) {
    // publication succeeded
    var publishedRecord = ar;
  } else {
    // publication failed
  }
});
