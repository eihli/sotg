var locationTuples = [];

var getLocation = function() {
  for(var i = 0; i < locationTweets.length; i++) {
    locationTuples.push([locationTweets[i].latitude, locationTweets[i].longitude]);
  }
  return locationTuples;
};
