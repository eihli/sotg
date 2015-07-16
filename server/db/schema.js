/**
  * Schema for mySql
  *@module db/schema
  */
var db = require('../config/db.js');  
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
      // user.string('salt'); bcrypt takes care of this for us
      user.string('apiKey');
    }).then(function(table) {
      console.log('Created table', table);
    });
  }
});

db.knex.schema.hasTable('Tweet').then(function(exists) {
  if(!exists) {
    db.knex.schema.createTable('Tweet', function(tweet) {
      // tweed IDs come back as strings because they are too large
      // for JS ints. But bookshelf doesn't let you store 'id'
      // as a string because it's a reserved word for ints only
      tweet.string('tweetId').primary();
      tweet.string('userId');
      tweet.string('text');
      tweet.string('source');
      tweet.float('longitude');
      tweet.float('latitude');
      tweet.string('tweetCreatedAt');
      //hashtags as a foreign key
      tweet.text('entities');
    }).then(function(table) {
      console.log('Created table', table);
    });
  }
});

db.knex.schema.hasTable('Keyword').then(function(exists) {
  if(!exists) {
    db.knex.schema.createTable('Keyword', function(keyword) {
      keyword.increments('id').primary();
      keyword.string('keyword');
      keyword.integer('streamId');
      keyword.timestamps();
    }).then(function(table) {
      console.log('Created table', table);
    });
  }
});

// db.knex.schema.hasTable('TweetHashtagIntersection').then(function(exists) {
//   if(!exists) {
//     db.knex.schema.createTable('TweetHashtagIntersection', function(hashtag) {
//       hashtag.increments('id').primary();
//       hashtag.string('tag');
//     }).then(function(table) {
//       console.log('Created table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('Hashtag').then(function(exists) {
//   if(!exists) {
//     db.knex.schema.createTable('Hashtag', function(hashtag) {
//       hashtag.increments('id').primary();
//       hashtag.string('tag');
//     }).then(function(table) {
//       console.log('Created table', table);
//     });
//   }
// });

setTimeout(function() {
}, 1000);
module.exports = db;
/**
  * Remove all tables from the database 
  *@arg next {function} Function to run after truncation is complete
  */

