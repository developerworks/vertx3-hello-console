#!/bin/bash

export CLASSPATH=$CLASSPATH:./src/main/resources
export CLASSPATH=$CLASSPATH:./node_modules/rx/dist

RUN="./node_modules/.bin/vertx run"
JAVA_OPT="-Duser.language=en -Duser.country=US -Duser.variant=en_US"

${RUN} --java-opts=${JAVA_OPT} --launcher-class=io.vertx.core.Launcher --redeploy=./src/main/js/rx/*.js ./src/main/js/rx/timer.js
