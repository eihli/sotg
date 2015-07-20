var User = require('../users/userModel.js');

var authAPIKey = module.exports.authAPIKey = function(req, res, next) {
  var apiKey = req.body.apiKey;

  if(!apiKey) {
    res.status(404).send('Must provide an API key for this endpoint.');
  }
  
  new User({
    apiKey: apiKey
  })
  .fetch()
  .then(function(user) {
    if(user) {
      next(); //go to next function to resolve API request
    } else {
      res.status(404).send('Invalid API key!');
    }
  });
};
