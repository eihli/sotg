#!/bin/bash
if [ "$SERVER_TYPE" == "tweethandler" ]
  then
  ./handle.sh
elif [ "$SERVER_TYPE" == "streaming" ]
  then
  ./stream.sh
else
  node ./server/server.js
fi
