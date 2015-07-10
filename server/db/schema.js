var config = require('./config.js');
var knex = require('knex')({
  client: 'mysql',
  //TODO find the proper address for the 
  connection: process.env.CLEARDB_DATABASE_URL || {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    charset: 'utf8'
  }
});

var db = require('bookshelf')(knex);

//drop all tables. 
if (false) {
  db.knex.schema.dropTableIfExists('User').then(function(table) {
    console.log('Dropped table', table);
  });
}

//create tables
db.knex.schema.hasTable('User').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('User', function(user) {
      user.increments('id').primary();
      user.timestamps();
      user.string('username');
      user.string('password');
      user.string('salt');
      user.string('email');
      user.string('apiKey');
    }).then(function(table) {
      console.log('Created table', table);
    });
  }
});

db.truncateAllTables = function(callback) {
  db.knex('User').truncate().then(function() {
    callback();
  });
};

module.exports = db;
