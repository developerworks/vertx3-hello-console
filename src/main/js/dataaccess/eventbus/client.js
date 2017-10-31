var EventBus = require("vertx3-eventbus-client")
var eb = new EventBus("http://localhost:8080/service/db/");

// 同步接收消息
function receive_sync(error, message) {
  return new Promise((resolve, reject) => {
    if (error == null) {
      resolve(message)
    }
    else {
      reject(error)
    }
  })
}

exports.receive_sync = receive_sync

eb.onopen = function () {
  eb.registerHandler("db.client", async function (error, received_msg) {
    var received_msg = await receive_sync(error, received_msg)
    console.log(received_msg)
  });
  var jsonobject = {
    name: "元气糯米团子",
    age: 587
  }
  var headers = {
    accept: "application/json",
    encoding: "utf8"
  }
  eb.send("service.db", JSON.stringify(jsonobject), headers, function (error, message) {
    if (error == null) {
      console.log("========== Response: ==============")
      console.log(message);
    }
    else {
      console.log("========== Error: ==============")
      console.error(error)
    }
  });
}

function dispatchMessage(message) {
  let headers = message.headers()

}
