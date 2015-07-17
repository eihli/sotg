var tweetController = require('./tweetController.js');

/**
 * A module that routes tweet endpoints
 * @module tweet/tweetRoutes
 */

 module.exports = function(app) {
  app.post('/', tweetController.handleInsert);
  app.delete('/', tweetController.handleDelete);
  app.post('/scrubGeo', tweetController.handleScrubGeo);
 }; 
