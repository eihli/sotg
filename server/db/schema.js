/**
  * Schema for mySql
  *@module db/schema
  */

var db = require('../config/db.js');

/**
 * Remove all tables from the database 
 */

if (false) {
  db.knex.schema.dropTableIfExists('ApiTransaction').then(function(table) {
    console.log('Dropped table ApiTransaction');

    db.knex.schema.dropTableIfExists('User').then(function(table) {
      console.log('Dropped table User');
    });

  });

  db.knex.schema.dropTableIfExists('Tweet').then(function(table) {
    console.log('Dropped table Tweet');
  });

  db.knex.schema.dropTableIfExists('Keyword').then(function(table) {
    console.log('Dropped table Keyword');
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
      // user.string('salt'); bcrypt takes care of this for us
      user.string('apiKey');
    }).then(function(table) {
      console.log('Created table User');
    });
  }
});

db.knex.schema.hasTable('ApiTransaction').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('ApiTransaction', function(apiTransaction) {
      apiTransaction.increments('id').primary();
      apiTransaction.timestamps();
      apiTransaction.integer('userId').unsigned().references('User.id').notNullable();
      apiTransaction.string('route');
    }).then(function(table) {
      console.log('Created table ApiTransaction');
    });
  }
});

db.knex.schema.hasTable('Tweet').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('Tweet', function(tweet) {
      // tweed IDs come back as strings because they are too large
      // for JS ints. But bookshelf doesn't let you store 'id'
      // as a string because it's a reserved word for ints only
      tweet.string('tweetId');
      tweet.string('userId');
      tweet.string('text');
      tweet.string('source');
      tweet.float('longitude');
      tweet.float('latitude');
      tweet.integer('retweetCount');
      tweet.integer('favoriteCount');
      tweet.bigInteger('tweetCreatedAt');
      tweet.string('lang');
      tweet.float('sentiment');
    }).then(function(table) {
      console.log('Created table Tweet');
    });
  }
});

db.knex.schema.hasTable('Keyword').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('Keyword', function(keyword) {
      keyword.increments('id').primary();
      keyword.string('keyword');
      keyword.integer('streamId');
      keyword.timestamps();
    }).then(function(table) {
      console.log('Created table Keyword');
    });
  }
});

db.knex.schema.hasTable('keyword_user').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('keyword_user', function(table) {
      table.integer('User_id').unsigned().references('User.id');
      table.integer('Keyword_id').unsigned().references('Keyword.id');
    }).then(function(table) {
      console.log('Created table keyword_user');
    });
  }
});



db.truncateAllTables = function(done) {

  db.knex.raw('delete from ApiTransaction').then(function(then) {

  });
  db.knex.raw('delete from User').then(function(then) {

  });
  db.knex.raw('delete from Tweet').then(function(then) {

  });
  db.knex.raw('delete from Keyword').then(function(then) {

  });

  done();
};

module.exports = db;
