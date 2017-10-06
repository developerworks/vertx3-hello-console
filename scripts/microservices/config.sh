#!/bin/bash

export CLASSPATH=./src/conf
export CLASSPATH=$CLASSPATH:./src/main/resources

RUN="./node_modules/.bin/vertx run"

${RUN} --redeploy=./src/microservices/config/*.js --launcher-class=io.vertx.core.Launcher ./src/microservices/config/index.js
