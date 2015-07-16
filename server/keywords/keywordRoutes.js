var keywordController = require('./keywordController.js');

/**
 * A module that routes keyword get and post requests
 * @module keywords/keywordRoutes
 */

module.exports = function(app) {
  app.post('/', keywordController.addKeyword);
  app.get('/', keywordController.getKeywords);
};
