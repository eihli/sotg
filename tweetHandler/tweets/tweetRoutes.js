var tweetController = require('./tweetController.js');

/**
 * A module that routes tweet endpoints
 * @module tweet/tweetRoutes
 */

 module.exports = function(app) {
  app.post('/', function(req, res, next) {
    console.log("Calling tweetController.handleInsert");
    tweetController.handleInsert(req, res, next)
  });
  app.delete('/', tweetController.handleDelete);
  app.post('/scrubGeo', tweetController.handleScrubGeo);
 }; 
