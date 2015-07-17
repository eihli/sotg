#!/bin/bash
node ./server/server.js &
sleep 1
node ./tweetHandler/server.js &
sleep 1
node ./streaming/server.js &
