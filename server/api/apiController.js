var db = require('../db/schema.js'),
  queue = require('../utils/queue.js');

module.exports = {
  getKey: function(req, res, next) {
    //QUESTION: might not need this?
    // var username = req.query.username;

    //TODO: set token header on frontend AJAX request
    var session_token = req.headers['x-access-token'],
      app_name = req.query.app_name;

    //for testing purposes
    console.log('session_token: ' + session_token);
    console.log('app_name: ' + app_name);
  },
  getSearch: function(req, res, next) {
    var keyword = req.query.keyword,
      api_key = req.query.api_key;

    console.log('keyword: ' + keyword);
    console.log('api_key: ' + api_key);
  },
  getLocation: function(req, res, next) {
    var location_value = req.query.location_value,
    //QUESTION: can keyword be null?
      keyword = req.query.keyword;
      api_key = req.query.api_key;

    console.log('location_value: ' + location_value);
    console.log('keyword: ' + keyword);
    console.log('api_key: ' + api_key);
  },
  getSentiment: function(req, res, next) {
    //QUESTION: should be either positive/negative or something else?
    var sentiment_value = req.query.sentiment_value,
      keyword = req.query.keyword;
      api_key = req.query.api_key;

    console.log('sentiment_value: ' + sentiment_value);
    console.log('keyword: ' + keyword);
    console.log('api_key: ' + api_key);
  },
  getTime: function(req, res, next) {
    var time_range = req.query.time_range,
      keyword = req.query.keyword;
      api_key = req.query.api_key;

    console.log('time_range: ' + time_range);
    console.log('keyword: ' + keyword);
    console.log('api_key: ' + api_key);
  }
};
