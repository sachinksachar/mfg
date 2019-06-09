angular.module('mfg').controller('loginCtrl', ['$http', '$scope', '$state', '$stateParams', '$filter', '$ionicModal', '$ionicPopup', '$ionicLoading', '$ionicPlatform', '$timeout', '$ionicTabsDelegate', '$ionicSlideBoxDelegate','$window',
  function ($http, $scope, $state, $stateParams, $filter, $ionicModal, $ionicPopup, $ionicLoading, $ionicPlatform, $timeout, $ionicTabsDelegate, $ionicSlideBoxDelegate, $window) {


    $scope.activeSlide = 0;
    $scope.slideChanged = function (index) {
      $ionicTabsDelegate.select(index);
    };

    $scope.setSlide = function (index) {
      $ionicSlideBoxDelegate.slide(index);
    };

    //Register Starts from here

    $scope.registerUser = {}
    $scope.register = function (regUsers) { 
      $scope.registerUser.tandc = 1;
      $http({
        url: __env.apiUrl + '/auth/register',
        method: "POST",
        data: $scope.registerUser,
        headers: { 'Content-Type': 'application/json' }
      }).then(function (response) { 
        if(response.status == 200){
          $window.localStorage['authKey'] = response.data.key;
          $window.localStorage['token'] = response.data.token;
        }        

      }, function (error) {  
        

      });
    }

    // Login starts from here
    $scope.user = {}
    $scope.Login = function (user) { 
      $http({
        url: __env.apiUrl + '/auth/login',
        method: "POST",
        data: $scope.user,
        headers: { 'Content-Type': 'application/json' }
      }).then(function (response) { 
        if(response.status == 200){
          $window.localStorage['authKey'] = response.data.key;
          $window.localStorage['token'] = response.data.token;
          $state.go("app.components");
        }     
      }, function (error) { 
        

      });
    }


  }])