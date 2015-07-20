var apiController = require('./apiController.js');
var keywordController = require('./keywordController.js');
var middleware = require('./middleware.js');

module.exports = function(app) {
  app.get('/key', apiController.getKey);
  app.get('/search', middleware.authAPIKey, apiController.getSearch);
  app.get('/sentiment', middleware.authAPIKey, apiController.getSentiment);
  app.get('/time', middleware.authAPIKey, apiController.getTimeRange);
  app.post('/keywords', middleware.authAPIKey, keywordController.addKeyword);
  app.get('/keywords', keywordController.getKeywords);
  app.delete('/keywords', keywordController.deleteKeyword);
};
