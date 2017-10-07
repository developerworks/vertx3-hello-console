#!/bin/bash

export CLASSPATH=./src/conf
export CLASSPATH=$CLASSPATH:./src/main/resources

RUN="./node_modules/.bin/vertx run"

${RUN} --redeploy=./src/systeminfo/*.js --launcher-class=io.vertx.core.Launcher ./src/systeminfo/index.js
