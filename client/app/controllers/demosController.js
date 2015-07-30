angular.module('demosCtrl', [])
.controller('demosController', function($state) {
  var vm = this;
  vm.$state = $state;
});
