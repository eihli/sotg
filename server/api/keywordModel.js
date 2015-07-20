var db = require('../db/schema'),
  User = require('../users/userModel.js');

var Keyword = db.Model.extend({
  tableName: 'Keyword',
  hasTimestamps: true,
  defaults: {},
  users: function() {
    return this.belongsToMany(User);
  }
});

module.exports = Keyword;
