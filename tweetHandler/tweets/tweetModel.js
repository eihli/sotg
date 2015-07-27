var db = require('../../server/db/schema');
console.log("Connected to: ", db.VERSION);

db.knex.select('keyword').from('keywords')
.then(function(keywords) {
  console.log("Keywords: ", keywords);
})
.catch(function(err) {
  console.log("Caught: ", err);
});

var Tweet = db.Model.extend({
  tableName: 'tweets',
  defaults: {}
});

module.exports = Tweet;
