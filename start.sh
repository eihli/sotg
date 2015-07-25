#!/bin/bash
if [ "$SERVER_TYPE" == "tweethandler" ]
  then
  node ./tweetHandler/server.js
elif [ "$SERVER_TYPE" == "streaming" ]
  then
  node ./streaming/server.js
else
  node ./server/server.js
fi
