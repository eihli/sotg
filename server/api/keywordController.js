var Keyword = require('./keywordModel.js'),
  db = require('../db/schema.js');

var getLeastUsedStream = function() {
  return 1;
};

module.exports = {

  // Right now, we are aren't checking to see if this api_key was given to us by an authenticated user.
  // What if Alice sends a GET request with Bob's API key? Is that a problem?
  // Either way, we need to at least check and see if this api_key is valid.
  // It might be best to do that in middleware in the route, so if someone
  // makes it to this function, we don't need to worry about the key inside this function.™
  addKeyword: function(req, res, next) {
    var keyword = req.body.keyword,
      leastUsedStream = getLeastUsedStream();
    console.log(keyword);
    new Keyword({
      keyword: keyword
    })
    .fetch()
    .then(function(exists) {
      if (exists) {
        return next({
          result: 'update',
          value: exists.get('keyword')
        });
      } else {
        new Keyword({
          keyword: keyword,
          streamId: leastUsedStream
        })
        .save()
        .then(function(keyword) {
          return next({
            result: 'insert',
            value: keyword.get('keyword')
          });
        });
      }
    });
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
