angular.module('queryBuilderCtrl', [])
.controller('queryBuilderController', function(Auth, QueryBuilder, $location, $window, $state, $scope) {
  var vm = this;
  $scope.$state = $state;

  Auth.profile()
  .then(function(res){
      $scope.isAuth = true;
      $scope.apiKey = res.data.apiKey;
    })
    .catch(function(err){
      $scope.isAuth = false;
      $scope.apiKey = 'Your_API_Key';
    });
  $scope.loading = false;
  $scope.encodedKeyword = 'Pizza';
  $scope.keyword = 'Pizza';
  $scope.sentiment = 'positive';
  $scope.httpVerb = 'GET';
  $scope.startTime = new Date();
  $scope.endTime = new Date();
  $scope.startTimeMS = $scope.startTime.getTime();
  $scope.endTimeMS = $scope.endTime.getTime();

  $scope.encodeKeyword = function() {
    $scope.encodedKeyword = encodeURIComponent($scope.keyword); 
  };

  $scope.startTimeConvert = function() {
    $scope.startTimeMS = $scope.startTime.getTime();
  }; 

  $scope.endTimeConvert = function() {
    $scope.endTimeMS = $scope.endTime.getTime();
  };

  $scope.getQuery = function() {
    if($state.is('queryBuilder.search')) {
      return 'http://sotg.xyz/api/search?keyword=' + $scope.encodedKeyword + '&apiKey=' + $scope.apiKey;
    } else if($state.is('queryBuilder.keyword')) {
      return 'http://sotg.xyz/api/keywords?keyword=' + $scope.encodedKeyword + '&apiKey=' + $scope.apiKey;
    } else if($state.is('queryBuilder.sentiment')) {
      return 'http://sotg.xyz/api/sentiment?keyword=' + $scope.encodedKeyword + '&sentiment=' + $scope.sentiment + '&apiKey=' + $scope.apiKey;
    } else if($state.is('queryBuilder.time')) {
      return 'http://sotg.xyz/api/time?keyword=' + $scope.encodedKeyword + '&startTime=' + $scope.startTimeMS + '&endTime=' + $scope.endTimeMS + '&apiKey=' + $scope.apiKey;
    }
  };

  $scope.submitQuery = function() {
    var queryURL = $scope.getQuery().slice(16);
    $scope.loading = true;
    QueryBuilder.makeQuery(queryURL, $scope.httpVerb, function(data) {
      data = data.slice(0, 50);
      $scope.jsonResult = JSON.stringify(data, null, ' ');
      $scope.loading = false;
    });
  };
});
