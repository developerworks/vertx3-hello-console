#!/bin/bash

export CLASSPATH=$CLASSPATH:./src/main/resources
export CLASSPATH=$CLASSPATH:./lib/*
export CLASSPATH=$CLASSPATH:./target/*
export CLASSPATH=$CLASSPATH:./src/main/js

RUN="./node_modules/.bin/vertx run"
JAVA_OPT="-Duser.language=en -Duser.country=US -Duser.variant=en_US -Dhazelcast.logging.type=slf4j"

# Javascript Verticle 入口文件
${RUN} --java-opts=${JAVA_OPT} --launcher-class=io.vertx.core.Launcher --redeploy=./src/main/js/common/*.js ./src/main/js/common/index.js

