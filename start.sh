#!/bin/bash
# echo "RDS_HOSTNAME = "$RDS_HOSTNAME
# echo "RDS_USERNAME = "$RDS_USERNAME
# echo "RDS_PASSWORD = "$RDS_PASSWORD
# echo "RDS_DB_NAME = "$RDS_DB_NAME
# echo "API_ADDRESS = "$API_ADDRESS
# echo "API_PORT = "$API_PORT
# echo "HANDLER_ADDRESS = "$HANDLER_ADDRESS
# echo "HANDLER_PORT = "$HANDLER_PORT
# echo "STREAMING_PORT = "$STREAMING_PORT
# echo "STREAMING_ADDRESS = "$STREAMING_ADDRESS
# echo "ACCESS_TOKEN = "$ACCESS_TOKEN
# echo "TOKEN_SECRET = "$TOKEN_SECRET
# echo "CONSUMER_KEY = "$CONSUMER_KEY
# echo "CONSUMER_SECRET = "$CONSUMER_SECRET

if [ "$SERVER_TYPE" == "tweethandler" ]
  then
  ./handle.sh
elif [ "$SERVER_TYPE" == "streaming" ]
  then
  ./stream.sh
else
  node ./server/server.js
fi
