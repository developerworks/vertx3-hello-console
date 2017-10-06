## 全局数据共享

全局共享数据只适合存储小数据, 不适合存储文件这类比较大的数据.

### 在Verticle内共享

数据库配置

```js
var config_mysql = {
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root'
}
vertx.setMap('config_mysql', config_mysql)
```

运行 `yarn shared_data` 查看效果
