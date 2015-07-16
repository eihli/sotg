var db = require('../db/schema');

var Keyword = db.Model.extend({
  tableName: 'Keyword',
  hasTimestamps: true,
  defaults: {}
});

module.exports = Keyword;
