var User = require('../../../server/users/userModel.js'),
  db = require('../../../server/config/db.js'),
  Q = require('q'),
  should = require('chai').should();

/**
 * Describes how a user should work
 * @class
 */

describe('User', function() {

  var user;
  var PASS = 'password';
  var USER = 'user';

  //create the user then call the it functions
  before(function(next) {
    var app = require('../../../server/server.js');
    var port = 8000;
    var server;
    before(function(done) {
      server = app.listen(port);
      setTimeout(function() {
        done();
      }, 1000);
    });
    db.truncateAllTables(function() {
      new User({
          username: USER,
          password: PASS
        })
        .save()
        .then(function(model) {
          user = model;
          next();
        });
    });
  });

  it('should create a user', function() {
    should.exist(user);
  });

  it('should create an api key', function() {
    should.exist(user.get('apiKey'));
    user.get('apiKey').should.not.equal('');
  });

  it('should compare correct passwords', function(next) {
    user
      .comparePassword(PASS, function(isMatch) {
        isMatch.should.equal(true);
        next();
      });
  });

  it('should compare incorrect passwords', function(next) {
    user
      .comparePassword('notthepass', function(isMatch) {
        isMatch.should.equal(false);
        next();
      });
  });

});
