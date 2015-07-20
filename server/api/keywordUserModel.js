var db = require('../config/db.js');
var keyword_user_join = db.Model.extend({
  tableName: 'keyword_user',
  defaults: {},

  /** 
   * Initializes the user with salt and apikey 
   *@function
   */
  initialize: function() {
  },

  upsert: function(callback) {
    var context = this;
    new keyword_user_join({
      keyword_id: this.get('keyword_id'),
      user_id: this.get('user_id')
    })
    .fetch()
    .then(function(exists) {
      if (exists) {
        callback();
      } else {
        new keyword_user_join({
          keyword_id: context.get('keyword_id'),
          user_id: context.get('user_id')
        })
        .save()
        .then(function(model) {
          callback();
        });
      }
    });
  }

});

module.exports = keyword_user_join;


