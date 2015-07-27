var Tweet = require('../tweets/tweetModel.js'),
  db = require('../../server/db/schema.js'),
  sentiment = require('sentiment'), 
  async = require('async');

var saveToDB = function(tweet, callback) {
  var parsedTweet = {
    tweetId: tweet.id_str,
    userId: tweet.user.id_str,
    tweetCreatedAt: parseInt(tweet.timestamp_ms), 
    text: tweet.text,
    source: tweet.source, 
    retweetCount: tweet.retweet_count, 
    favoriteCount: tweet.favorite_count, 
    lang: tweet.lang, 
  };

  if (tweet.coordinates !== null) {
    parsedTweet.longitude = tweet.coordinates.coordinates[0];
    parsedTweet.latitude = tweet.coordinates.coordinates[1];
  } else if (tweet.place !== null) {
    //calculate latitude & longitude from bounding box
    var bounding_box = tweet.place.bounding_box.coordinates[0], 
        longitude = (bounding_box[0][0] + bounding_box[2][0]) / 2, 
        latitude = (bounding_box[0][1] + bounding_box[1][1]) / 2;

    parsedTweet.longitude = longitude;
    parsedTweet.latitude = latitude;
  } else {
    parsedTweet.longitude = null;
    parsedTweet.latitude = null;
  }

  //Naive sentiment analysis
  parsedTweet.sentiment = sentiment(parsedTweet.text).comparative;

  new Tweet(parsedTweet)
    .save()
    .then(function(tweet) {
      if (tweet) {
        console.log("Saved tweet to database.", tweet.toString());
        return callback();
      } else {
        next(new Error('Could not save tweet to the Database!'));
        return callback();
      }
    });
};

var deleteFromDB = function(deleteMessage, callback) {
  new Tweet()
    .query({
      where: {
        tweetId: deleteMessage.delete.status.id_str
      }
    })
    .destroy()
    .then(function(tweet) {
      if (tweet) {
        callback();
      } else {
        deletionQ.push(deleteMessage);
        callback();
      }
    });
};

var nullifyGeoData = function(tweet, callback) {
  new Tweet({
    userId: scrubGeoMessage.scrub_geo.user_id 
  })
  .fetchAll(function(tweets) {
    tweets.forEach(function(tweet) {
      tweet.latitude = null;
      tweet.longitude = null;
    });
    tweets.save().then(function() {
      console.log('tweets geo data updated to NULL');
      return callback();
    });
  });
};

module.exports.addEventually = function(tweet) {
  console.log("Pushing tweet to insertionQ");
  insertionQ.push(tweet);
};

module.exports.deleteEventually = function(deleteMessage) {
  deletionQ.push(deleteMessage);

  if(deletionQ.length() < 10) {
    deletionQ.pause();
  }

  if(deletionQ.length() > 10 && deletionQ.paused) {
    deletionQ.resume();
  }
};

module.exports.scrubGeoEventually = function(scrubGeoMessage) {
  scrubGeoQ.push(scrubGeoMessage);

  if(scrubGeoQ.length() < 10) {
    scrubGeoQ.pause();
  }

  if(scrubGeoQ.length() > 10 && scrubGeoQ.paused) {
    scrubGeoQ.resume();
  }
};

var insertionQ = async.queue(saveToDB, 100);
var deletionQ = async.queue(deleteFromDB, 1);
deletionQ.pause(); //don't start deletionQ until there are 10 delete messages present
var scrubGeoQ = async.queue(nullifyGeoData, 1);
scrubGeoQ.pause();
