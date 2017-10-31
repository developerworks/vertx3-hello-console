#!/bin/bash

export CLASSPATH=$CLASSPATH:./src/main/resources
export CLASSPATH=$CLASSPATH:./lib/*
export CLASSPATH=$CLASSPATH:./target/*

RUN="./node_modules/.bin/vertx run"
JAVA_OPT="-Duser.language=en -Duser.country=US -Duser.variant=en_US -Dhazelcast.logging.type=slf4j"

${RUN} --java-opts=${JAVA_OPT} --launcher-class=io.vertx.core.Launcher --redeploy=./src/main/js/clustering/*.js -cluster ./src/main/js/clustering/eventbus.js

