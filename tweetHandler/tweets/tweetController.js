var queues = require('../config/queue.js');

  /**
   * A module that handles all tweet endpoints
   * @module tweets/tweetController
   */

module.exports = {
  handleInsert: function(req, res, next) {
    var tweet = req.body;
    console.log("Adding tweet to queues.");
    queues.addEventually(tweet);
    res.send("Added tweet to queue.");
  },

  handleDelete: function(req, res, next) {
    var deleteMessage = req.body;
    queues.deleteEventually(deleteMessage);
    res.end();
  },

  handleScrubGeo: function(req, res, next) {
    var scrubGeoMessage = req.body;
    queues.scrubGeoEventually(scrubGeoMessage);
    res.end();
  }
};
