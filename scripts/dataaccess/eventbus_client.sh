#!/bin/bash

nodemon -q -w src --delay 1 --exec './node_modules/.bin/babel-node ./src/main/js/dataaccess/eventbus/client.js'


