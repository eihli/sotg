// var Tweet = require('../../../tweetHandler/tweets/tweetModel.js'),
//   db = require('../../../server/db/schema.js'),
//   request = require('request'),
//   should = require('chai').should(),
//   PORT = 6001; //this port is used to test

// /**
//  * Describes the Tweet Handler's end points
//  * @class
//  */

// describe('TweetHandler', function() {
//   var app = require('../../../tweetHandler/server.js')(PORT);
//   var tweet = require('../../data/tweet.js');

//   before(function(next) {
//     setTimeout(function() {
//       next();
//     }, 1000);
//   });

//   after(function(next) {
//     next();
//   });

//   describe('Tweet Handler End Points', function() {
//     beforeEach(function(next) {

//       //empty tables
//       db.truncateAllTables(function() {
//         //insert a tweet
//         var options = {
//           'method': 'POST',
//           'uri': 'http://localhost:' + PORT + '/tweets',
//           'json': tweet
//         };

//         request(options, function(error, res, body) {
//           next();
//         });
//       });
//     });

//     it('insert a tweet into the db', function(next) {
//       new Tweet({
//           tweetId: tweet.id_str
//         })
//         .fetch()
//         .then(function(tweet) {
//           should.exist(tweet);
//           tweet.get('test').should.equal(tweet.text);
//           next();
//         });
//     });

//     it('delete a tweet from the db', function(next) {

//       var options = {
//         'method': 'DELETE',
//         'uri': 'http://localhost:' + PORT + '/tweets',
//         'json': {
//           "delete": {
//             "status": {
//               "id": 620000528928505857,
//               "id_str": "620000528928505857",
//               "user_id": 3,
//               "user_id_str": "3"
//             }
//           }
//         }
//       };

//       request(options, function(error, res, body) {
//         new Tweet({
//             tweetId: tweet.id_str
//           })
//           .fetch()
//           .then(function(tweet) {
//             should.not.exist(tweet);
//             next();
//           });
//       });
//     });

//     it('scrub geo a tweet from the db', function(next) {

//       var options = {
//         'method': 'POST',
//         'uri': 'http://localhost:' + PORT + '/tweets/scrubGeo',
//         'json': {
//           "scrub_geo": {
//             "user_id": 620000528928505857,
//             "user_id_str": "620000528928505857",
//             "up_to_status_id": 23260136625,
//             "up_to_status_id_str": "23260136625"
//           }
//         }
//       };

//       request(options, function(error, res, body) {
//         new Tweet({
//             tweetId: tweet.id_str
//           })
//           .fetch()
//           .then(function(tweet) {
//             should.exist(tweet);
//             should.not.exist(tweet.latitude);
//             should.not.exist(tweet.longitude);
//             next();
//           });
//       });
//     });


//   });


// });
