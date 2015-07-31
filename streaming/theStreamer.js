var timer = null, stream = null, keywords, PORT;

module.exports = {

  start: function() {

    var request = require('request'),
      fs = require('fs'),
      Twit = require('twit'),
      Timer = require('timer-stopwatch'),
      key = null,   //a key to the api server
      credentials = process.env.CONSUMER_KEY ? null : require('./config.js'),
      API_ADDRESS = process.env.API_ADDRESS || '127.0.0.1',
      HANDLER_ADDRESS = process.env.HANDLER_ADDRESS || '127.0.0.1',
      API_PORT = process.env.API_PORT || 8000, 
      HANDLER_PORT = process.env.HANDLER_PORT || 6000; //All handler 

    credentials = credentials || {
      consumer_key: process.env.CONSUMER_KEY, 
      consumer_secret: process.env.CONSUMER_SECRET, 
      access_token: process.env.ACCESS_TOKEN, 
      access_token_secret: process.env.TOKEN_SECRET
    };

    var T = new Twit(credentials);

    //spin up server
    //start a stopwatch 
    //during each interval: 
    // 1. get list of keywords from API
    // 2. open up streaming connection to twitter w/ those keywords
    // 3. start mining data

    //at the end of interval
    // 1. close streaming connection
    // 2. delay of 10s, get new keywords
    // 3. open new streaming connection w new keywords

    //say there are no keywords
    //option 1: turn on sample
    //option 2: get tweets by current popular trends? 

    //set globals 

    var createTimer = function() {
      timer = new Timer((1 * 1000 * 60), {
        almostDoneMS: 10000
      });
     
      timer.on('almostdone', function() {
        stream.stop();
      });

      timer.on('done', function() {
        createTimer();
        timer.start();
        startStream();
      });
    };

    var startStream = function() {
      var options = {
        'method': 'GET',
        'uri': 'http://' + API_ADDRESS + ':' + API_PORT + '/api/keywords?streamId=' + key,
      };

      request(options, function(error, res, body) {

        //reset local keywords with server call
        keywords = {};

        JSON.parse(body).forEach(function(elem) {
          keywords[elem] = true;
        });

        if (Object.keys(keywords).length === 0) {
          console.log('Starting the sample');
          stream = T.stream('statuses/filter', {
            track: [';lkajsdf;lkjasdf;ljkasdf;lkajsdf;lajksdf;lajksdf']
          });
          // stream = T.stream('statuses/sample');
          // initStream(stream);
        } else {

          console.log('Current Keys', Object.keys(keywords));
          stream = T.stream('statuses/filter', {
            track: Object.keys(keywords)
          });
          initStream(stream);
        }
      });
    };

    var initStream = function(stream) {
      stream.on('tweet', function(tweet) {
        //make a DELETE request to tweet handler, with tweet contents
        var options = {
          'method': 'POST',
          'uri': 'http://' + HANDLER_ADDRESS + ':' + HANDLER_PORT + '/tweets',
          'json': tweet
        };

        request(options, function(error, res, body) {
          if (error) {
            console.error(error);
          }
        });
      });

      stream.on('delete', function(deleteMessage) {
        //make a POST request to tweet handler, with deleteMessage
        var options = {
          'method': 'DELETE',
          'uri': 'http://' + HANDLER_ADDRESS + ':' + HANDLER_PORT + '/tweets',
          'json': deleteMessage
        };

        request(options, function(error, res, body) {
          if (error) {
            console.error(error);
          }
        });
      });

      stream.on('scrub_geo', function(scrubGeoMessage) {
        //make a POST request to tweet handler, with geoMessage
        var options = {
          'method': 'POST',
          'uri': 'http://' + HANDLER_ADDRESS + ':' + HANDLER_PORT + '/tweets/scrubGeo',
          'json': scrubGeoMessage
        };
      });

      stream.on('reconnect', function(request, response, connectInterval) {
        console.log(request, response, connectInterval);
      });
    };

    //init global timer, start timer
    createTimer();
    timer.start();

    var options = {
      'method': 'GET',
      'uri': 'http://' + API_ADDRESS + ':' + API_PORT + '/api/streamingKey?port=' + PORT,
    };

    request(options, function(error, res, body) {
      console.log("Options inside streamer request: ", options);
      console.log("Res.body inside streamer request: ", res.body);
      key = res.body;

      if(res.statusCode === 400) {
        throw new Error(key);
      } else {
        console.log('Your Streaming Key: ' + key);
        //init global stream
        startStream();
      }
    });
  },
  
  set: function(sharedKeywords, listeningPort) {
    keywords = sharedKeywords;
    PORT = listeningPort;
  }

};
