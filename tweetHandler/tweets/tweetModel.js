var db = require('../../server/db/schema');

var Tweet = db.Model.extend({
  tableName: 'Tweet',
  defaults: {}
});

module.exports = Tweet;
