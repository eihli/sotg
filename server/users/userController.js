//imports
var User = require('./userModel.js'),
  jwt = require('jwt-simple'),
  db = require('../db/schema.js'),
  utils = require('../config/utils.js');

// Create an empty Bookshelf User model to interact with the database.
User = new User();

//globals
//TODO get a better phrase
var SECRET = 'superDupperSecret';

/**
 * A module that controls user activities
 * @module users/userController
 */

module.exports = {

  /** 
   * signin 
   */

  signin: function(req, res, next) {
    var username = req.body.username,
      password = req.body.password;
    
    User.authenticate({
      username: username,
      password: password
    }, function(err, response) {
      if (err) {
        res.status(400);
        res.send(err);
      } else {
        res.send(response);
      }
    });
  },

  /** signup */

  signup: function(req, res, next) {
    var username = req.body.username,
        password = req.body.password;

    // Validate inside the controller
    if (utils.validateEmail(username)) {
      // Interact with the database inside the model
      User.addUser({
        username: username,
        password: password
      }, function(err, resposne) {
        if (err) {
          res.status(400);
          res.send(err);
        } else {
          // The model is currently returning a token. TODO: Handle it.
          res.send(response);
        }
      });
    } else {
      return next(new Error('Username should be a valid email'));
    }
  },

  /** checkAuth */

  checkAuth: function(req, res, next) {
    console.log('checking auth');
  }
};
