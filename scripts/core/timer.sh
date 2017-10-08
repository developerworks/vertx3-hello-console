#!/bin/bash

export CLASSPATH=./src/conf
export CLASSPATH=$CLASSPATH:./src/main/resources

RUN="./node_modules/.bin/vertx run"
JAVA_OPT="-Duser.language=en -Duser.country=US -Duser.variant=en_US"

${RUN} --java-opts=${JAVA_OPT} ${LAUNCHER} --launcher-class=io.vertx.core.Launcher --redeploy=./src/core/timer/*.js ./src/core/timer/index.js
