angular.module('loginCtrl', [])
.controller('loginController', function(Auth, $location, $window) {
  var vm = this;
  vm.user = {};
  vm.loading = false;
  vm.logInUser = function(){
    Auth.login(vm.user)
    .then(function(){
      $location.path('/profile');
    })
    .catch(function(err){
      vm.error = err.data.error;
    });
  };
  vm.requestReset = function() {
    if (!vm.user.username) {
      vm.forgotPasswordResponse = {error: "Please enter your email address to recover your password."};
      return;
    }
    vm.loading = true;
    Auth.requestReset(vm.user.username)
    .then(function(res) {
      vm.loading = false;
      // console.log("loginController.requestReset -> ", res);
      vm.forgotPasswordResponse = res.data;
    })
    .catch(function(res) {
      vm.loading = false;
      // console.log("loginController.requestRest catch -> ", res);
      vm.forgotPasswordResponse = res.data;
    });
  };
});
