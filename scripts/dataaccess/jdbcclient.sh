#!/bin/bash
export CLASSPATH=./src/conf
export CLASSPATH=$CLASSPATH:./src/main/resources

./node_modules/.bin/vertx run --redeploy=./src/dataaccess/jdbcclient/*.js --launcher-class=io.vertx.core.Launcher ./src/dataaccess/jdbcclient/index.js
