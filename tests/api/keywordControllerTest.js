var should = require('chai').should();
var Keyword = require('../../server/api/keywordController.js');

describe('Keyword Controller', function() {
  describe('getLeastUsedStream should return array', function() {
    Keyword.getLeastUsedStream().should.be.an('array');
  });
});
