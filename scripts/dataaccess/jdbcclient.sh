#!/bin/bash

export CLASSPATH=$CLASSPATH:./src/main/resources
export CLASSPATH=$CLASSPATH:./lib/*

RUN="./node_modules/.bin/vertx run"
JAVA_OPT="-Duser.language=en -Duser.country=US -Duser.variant=en_US"

${RUN} --java-opts=${JAVA_OPT} --launcher-class=io.vertx.core.Launcher --redeploy=./src/main/js/dataaccess/jdbcclient/*.js ./src/main/js/dataaccess/jdbcclient/index.js
