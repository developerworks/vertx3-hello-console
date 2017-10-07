#!/bin/bash

export CLASSPATH=./src/conf
export CLASSPATH=$CLASSPATH:./src/main/resources

RUN="./node_modules/.bin/vertx run"

${RUN} --redeploy=./src/devops/healthcheck/*.js --launcher-class=io.vertx.core.Launcher ./src/devops/healthcheck/index.js
