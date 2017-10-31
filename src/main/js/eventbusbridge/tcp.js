/// <reference path="../../../../typings/vertx-js/vertx.d.ts" />

/**
 * Vert.x-tcp-eventbus-bridege 是一个到Vert.x事件总线的TCP桥
 *
 * 它的作用是, 通过TCP, 把对外部的访问接入到Vert.x的事件总线当中.
 * 因此所有基于TCP的应用程序都可以通过TCP桥连接到事件总线.
 *
 * TCP事件总线桥是基于TCP的, 意味着任何能够创建TCP套接字可以通过事件总线与远程Vertx实例进行交互/通信.
 *
 * TCP桥的主要用途和SockJS桥相比是: 对于那些资源受限的应用程序, 需要更加轻型的协议. 通信协议消息如下:
 *
 *
 * <Length: uInt32><{
 *   type: String,
 *   address: String,
 *   (replyAddress: String)?,
 *   headers: JsonObject,
 *   body: JsonObject
 * }: JsonObject>
 *
 * The message consists of a JSON document that may or may not have been minified.
 * The message must be prefixed by a big endian 32 bits positive integer (4 bytes) that
 * indicates the full length of the JSON document, in bytes.
 *
 * 该消息由一个JSON文档构成, 可以或者可以不压缩(minified). 消息必须有一个大端字节的32位正整数(4字节)支出JSON文档的完整长度.
 *
 * 客户端可以发送如下类型的消息
 *
 * -       send: 发送一个消息给一个地址
 * -    publish: 发布一个消息到一个地址
 * -   register: 订阅一个有指定地址发送/发布的消息
 * - unregister: 取消从一个指定地址发送/发布的订阅消息.
 *
 * 服务器端返回的消息类型可以是下面两种类型:
 *
 * - message: 发送或发布到一个地址的消息
 * -     err: 指明一个错误(body包含详细信息)
 */
var TcpEventBusBridge = require("vertx-tcp-eventbus-bridge-js/tcp_event_bus_bridge");

// 创建事件总线桥
var bridge = TcpEventBusBridge.create(vertx, {
  "inboundPermitteds": [{
    "address": "in"
  }],
  "outboundPermitteds": [{
    "address": "out"
  }]
});

// 监听
bridge.listen(7000, function (res, res_err) {
  if (res_err == null) {
    // 成功...
  } else {
    // 失败...
  }
});
