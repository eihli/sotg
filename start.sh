#!/bin/bash

echo $RDS_HOSTNAME
echo $RDS_USERNAME
echo $RDS_PASSWORD
echo $RDS_DB_NAME
echo $HANDLER_ADDRESS
echo $API_ADDRESS
echo $PORT
echo $HANDLER_PORT

if [ "$SERVER_TYPE" == "tweethandler" ]
  then
  ./handle.sh
elif [ "$SERVER_TYPE" == "streaming" ]
  then
  ./stream.sh
else
  node ./server/server.js
fi
