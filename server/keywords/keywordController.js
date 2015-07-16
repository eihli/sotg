var Keyword = require('./keywordModel.js'),
  db = require('../db/schema.js');

var getLeastUsedStream = function() {
  return 1;
};

module.exports = {
  addKeyword: function(req, res, next) {
    // get keyword from request body
    var keyword = req.body.keyword,
    // get the least used stream
      leastUsedStream = getLeastUsedStream();
    console.log(keyword);
    // create model
    new Keyword({
      keyword: keyword
    })
    .fetch()
    .then(function(exists) {
      if (exists) {
        // Updating keyword already in database (not necessary atm)
        return next({
          result: 'update',
          value: exists.get('keyword')
        });
      } else {
        // Inserting into database
        new Keyword({
          keyword: keyword,
          streamId: leastUsedStream
        })
        .save()
        .then(function(keyword) {
          console.log("Inserted ", keyword.get('keyword'));
          return next({
            result: 'insert',
            value: keyword.get('keyword')
          });
        });
      }
    });
    // return success response code 201?
  },
  getKeywords: function() {

  }
};
