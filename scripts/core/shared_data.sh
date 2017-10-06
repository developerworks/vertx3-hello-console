#!/bin/bash

export CLASSPATH=./src/conf
export CLASSPATH=$CLASSPATH:./src/main/resources

./node_modules/.bin/vertx run --redeploy=./src/core/shared_data/*.js --launcher-class=io.vertx.core.Launcher ./src/core/shared_data/index.js
