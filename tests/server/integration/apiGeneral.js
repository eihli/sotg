var PORT = 8001,
  request = require('request'),
  queue = require('../../../server/utils/queue.js'),
  should = require('chai').should();

describe('API Endpoint Behavior', function() {
  var app = require('../../../server/server.js')(PORT);
  before(function(done) {
    setTimeout(function() {
      done();
    }, 1000);
  });

  after(function(done) {
    done();
  });
  it('should return "success" on /addKeyword endpoint', function(next) {
    var addKeywordOptions = {
      'method': 'POST',
      'uri': 'http://localhost:' + PORT + '/api/addKeyword',
      'json': {
        'keyword': 'pizza'
      }
    };
    request(addKeywordOptions, function(error, res, body) {
      res.statusCode.should.equal(200);
      next();
    });
  });
  it('should return keywords on /getKeywords endpoint', function(next) {
    var getKeywordsOptions = {
      'method': 'GET',
      'uri': 'http://localhost:' + PORT + '/api/getKeywords',
      'json': {
        'streamId': 1
      }
    };
      request(getKeywordsOptions, function(error, res, body) {
        console.log(body);
        next();
      });
  });
});
