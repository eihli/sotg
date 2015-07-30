var essoteegeeApp = angular.module('essoteegeeApp', ['ui.router', 'sotgFactory', 'queryFactory',
'loginCtrl', 'signupCtrl', 'profileCtrl', 'demosCtrl', 'resetPasswordCtrl', 'logoutCtrl', 'queryBuilderCtrl','globeCtrl', 'ui.date', 'ngClipboard', 'hljs']);
essoteegeeApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider, ngClipProvider, hljsServiceProvider){

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('home',{
      url: '/',
      templateUrl: 'app/views/home.html'
    })
    .state('signup',{
      url: '/signup',
      templateUrl: 'app/views/signup.html'
    })
    .state('login',{
      url: '/login',
      templateUrl: 'app/views/login.html'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'app/views/profile.html'
    })
    .state('logout', {
      controller: 'logoutController'
    })
    .state('documentation', {
      url: '/documentation',
      templateUrl: 'app/views/documentation.html'
    })
    .state('demos', {
      url: '/demos',
      templateUrl: 'app/views/demos.html'
    })
    .state('demos.globe', {
      url: '/globe',
      templateUrl: 'app/views/partials/globe.html'
    })
    .state('demos.wordcloud', {
      url: '/wordcloud',
      templateUrl: 'app/views/partials/wordcloud.html'
    })
    .state('queryBuilder', {
      url: '/queryBuilder', 
      templateUrl: 'app/views/queryBuilder.html', 
      controller: 'queryBuilderController',
      name: 'queryBuilder'
    })
    .state('queryBuilder.search', {
      url: '/search'
    })
    .state('queryBuilder.keyword', {
      url: '/keyword'
    })
    .state('queryBuilder.sentiment', {
      url: '/sentiment'
    })
    .state('queryBuilder.time', {
      url: '/time'
    })
    .state('resetPassword', {
      url: '/resetPassword',
      templateUrl: 'app/views/resetPassword.html'
    });

    //set path to .swf file for copying to clipboard
    ngClipProvider.setPath("bower_components/zeroclipboard/dist/ZeroClipboard.swf");

    hljsServiceProvider.setOptions({
        // replace tab with 4 spaces
        tabReplace: '    '
      });

});
