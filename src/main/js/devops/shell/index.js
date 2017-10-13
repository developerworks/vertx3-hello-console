/// <reference path="../../../../../typings/vertx-js/vertx.d.ts" />

///////////////////////////////
// 1. 以命令行的方式启动 Shell 服务
///////////////////////////////


// Telnet

// vertx run -conf '{"telnetOptions":{"port":5000}}' service:io.vertx.ext.shell

// SSH

// # create a key pair for the SSH server
// keytool -genkey -keyalg RSA -keystore ssh.jks -keysize 2048 -validity 1095 -dname CN=localhost -keypass secret -storepass secret
// # create the auth config
// echo user.admin=password > auth.properties
// # start the shell
// vertx run -conf '{"sshOptions":{"port":4000,"keyPairOptions":{"path":"ssh.jks","password":"secret"},"authOptions":{"provider":"shiro","config":{"properties_path":"file:auth.properties"}}}}' service:io.vertx.ext.shell

// HTTP

// # create a certificate for the HTTP server
// keytool -genkey -keyalg RSA -keystore keystore.jks -keysize 2048 -validity 1095 -dname CN=localhost -keypass secret -storepass secret
// # create the auth config
// echo user.admin=password > auth.properties
// vertx run -conf '{"httpOptions":{"port":8080,"ssl":true,"keyStoreOptions":{"path":"keystore.jks","password":"secret"},"authOptions":{"provider":""shiro,"config":{"properties_path":"file:auth.properties"}}}}' service:io.vertx.ext.shell

//////////////////////////////////////
// 2. 把 Shell 服务作为 Verticle 进行部署
//////////////////////////////////////

// Telnet

vertx.deployVerticle("service:io.vertx.ext.shell", {
  "config": {
    "telnetOptions": {
      "host": "localhost",
      "port": 4000
    }
  }
});

// SSH

vertx.deployVerticle("service:io.vertx.ext.shell", {
  "config": {
    "sshOptions": {
      "host": "localhost",
      "port": 5000,
      "keyPairOptions": {
        "path": "src/test/resources/ssh.jks",
        "password": "wibble"
      },
      "authOptions": {
        "provider": "shiro",
        "config": {
          "properties_path": "file:/path/to/my/auth.properties"
        }
      }
    }
  }
});

// HTTP

vertx.deployVerticle("service:io.vertx.ext.shell", {
  "config": {
    "httpOptions": {
      "host": "localhost",
      "port": 8080,
      "ssl": true,
      "keyPairOptions": {
        "path": "src/test/resources/server-keystore.jks",
        "password": "wibble"
      },
      "authOptions": {
        "provider": "shiro",
        "config": {
          "properties_path": "file:/path/to/my/auth.properties"
        }
      }
    }
  }
});


// 注意:

// 当 Vert.x Shell 已经在 CLASSPATH 中, 可以使用 service:io.vertx.ext.shell 代替 service:io.vertx.ext.shell


//////////////////////////////
// 3. 以编程的方式启动 Shell 服务
//////////////////////////////

// SSH

var ShellService = require("vertx-shell-js/shell_service");
var service = ShellService.create(vertx, {
  "sSHOptions": {
    "host": "localhost",
    "port": 5000,
    "keyPairOptions": {
      "path": "server-keystore.jks",
      "password": "wibble"
    },
    "authOptions": {
      "type": "PROPERTIES",
      "config": {
        "properties_path": "file:/path/to/my/auth.properties"
      }
    }
  }
});
service.start();


// Telnet

var ShellService = require("vertx-shell-js/shell_service");
var service = ShellService.create(vertx, {
  "telnetOptions": {
    "host": "localhost",
    "port": 4000
  }
});
service.start();

// 警告: Telnet 不提供任何授权和加密


// HTTP

var ShellService = require("vertx-shell-js/shell_service");
var service = ShellService.create(vertx, {
  "httpOptions": {
    "host": "localhost",
    "port": 8080
  }
});
service.start();


////////////////////////////
// 4. 认证
////////////////////////////

// SSH 和 HTTP 方式都提供 vertx-auth 认证, 同时还支持一下方式

// 1. shiro
// 2. jdbc
// 3. mongo
