#!/bin/bash

export CLASSPATH=./src/conf
export CLASSPATH=$CLASSPATH:./src/main/resources
export CLASSPATH=$CLASSPATH:./src/core/logging

./node_modules/.bin/vertx run --redeploy=./src/core/logging/*.js --launcher-class=io.vertx.core.Launcher ./src/core/logging/deploy.js
