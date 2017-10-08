/**
 * 参考资料: http://vertx.io/docs/jsdoc/module-vertx-js_buffer.html
 * 运行命令: yarn core:buffer
 */

var logger = require("../logging/index").logger

// 导入 Buffer 模块
var Buffer = require("vertx-js/buffer")

// 创建一个新的空的 Buffer
var buffer1 = Buffer.buffer()
logger.info("Buffer1 length: {0}", buffer1.length())

// 创建一个带长度提示的 Buffer, 这种情况下, Buffer 实际没有内容, 长度还是0,
// 但是在已知 Buffer 需要存储多少数据的情况下, 可以减少内存分配的次数.

var buffer2 = Buffer.buffer(10)
logger.info("Buffer2 length: {0}", buffer2.length())

// 创建一个指定初始内容的 Buffer

var buffer3 = Buffer.buffer("http://www.totorotec.cn")
logger.info("Buffer3 length: {0}", buffer3.length())

// 创建一个指定初始内容, 指定编码的 Buffer

var buffer4 = Buffer.buffer("我是一个粉刷匠,粉刷本领强", "UTF-8")

// var pos_start = 0
// var pos_end = 8
logger.info("Buffer4 length: {0}", buffer4.length())
logger.info("Buffer4 content with utf8: {0}", buffer4.getString(0, buffer4.length(), 'utf-8'))


