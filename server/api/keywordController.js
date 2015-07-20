var Keyword = require('./keywordModel.js'),
  User = require('../users/userModel.js'),
  KeywordUser = require('./keywordUserModel.js'),
  db = require('../db/schema.js');

var addKeywordUser = function(apiKey, keyword, callback) {
  new User({apiKey: apiKey})
  .fetch()
  .then(function(user) {
    new KeywordUser({
      keyword_id: keyword.get('id'), 
      user_id: user.get('id')
    }).upsert(callback);
  });
};

var registeredStreams = [1, 2];
var nextStream = 0;

module.exports = {

  // This is inside module.exports so that we can test it in keywordControllerTests.js
  getLeastUsedStream: function() {
    var result = nextStream;
    nextStream++;
    if (nextStream >= registeredStreams.length) {
      nextStream = 0;
    }
    return result;
  },

  // Right now, we are aren't checking to see if this api_key was given to us by an authenticated user.
  // What if Alice sends a GET request with Bob's API key? Is that a problem?
  // Either way, we need to at least check and see if this api_key is valid.
  // It might be best to do that in middleware in the route, so if someone
  // makes it to this function, we don't need to worry about the key inside this function.™
  addKeyword: function(req, res, next) {
    var keyword = req.body.keyword,
      apiKey = req.body.apiKey;
      leastUsedStream = module.exports.getLeastUsedStream();
    new Keyword({
      keyword: keyword
    })
    .fetch()
    .then(function(exists) {
      if (exists) {
        addKeywordUser(apiKey, exists, function() {
          res.send("Added " + keyword + " and " + apiKey + " to database.");
        });
      } else {
        new Keyword({
          keyword: keyword,
          streamId: leastUsedStream
        })
        .save()
        .then(function(keywordModel) {
          addKeywordUser(apiKey, keywordModel, function() {
            res.send("Inserted " + keywordModel + " and " + apiKey + " to database.");
          });
        });
      }
    });
  },

  deleteKeyword: function(req, res, next) {
    var keyword = req.body.keyword,
    apiKey = req.body.apiKey;
    new Keyword({
      keyword: keyword
    })
    .fetch()
    .then(function(model) {
            
    });
    .destroy();
  },

  getKeywords: function(req, res, next) {
    var streamId = req.body.streamId;
    var resultArray;
    new Keyword({streamId: streamId}).fetchAll()
    .then(function(results) {
      resultArray = results.map(function(el) {
        return el.get('keyword');
      });
      res.json(resultArray);
    });
  }
};
