#!/bin/bash

export CLASSPATH=./src/conf
export CLASSPATH=$CLASSPATH:./src/main/resources

RUN="./node_modules/.bin/vertx run"

${RUN} --redeploy=./src/eventbusbridge/*.js --launcher-class=io.vertx.core.Launcher ./src/eventbusbridge/send.js
