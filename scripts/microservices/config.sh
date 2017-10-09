#!/bin/bash

export CLASSPATH=$CLASSPATH:./src/main/resources

RUN="./node_modules/.bin/vertx run"

${RUN} --redeploy=./src/main/js/microservices/config/*.js --launcher-class=io.vertx.core.Launcher ./src/main/js/microservices/config/index.js
