angular.module('mfg').controller('loginCtrl', ['$http', '$scope', '$state', '$stateParams', '$filter', '$ionicModal', '$ionicPopup', '$ionicLoading', '$ionicPlatform', '$timeout', '$ionicTabsDelegate', '$ionicSlideBoxDelegate', '$window',
  function ($http, $scope, $state, $stateParams, $filter, $ionicModal, $ionicPopup, $ionicLoading, $ionicPlatform, $timeout, $ionicTabsDelegate, $ionicSlideBoxDelegate, $window) {


    $scope.loadingEvent = function () {
      $ionicLoading.show({
        content: 'Loading',
        template: '<ion-spinner icon="lines" class="spinner-assertive"></ion-spinner>',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    }

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
      }).then(function (response) { debugger
        if (response.status == 200) {
          $window.localStorage['authKey'] = response.data.key;
          $window.localStorage['token'] = response.data.token;
          $http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.token;
          $http.defaults.headers.common.appKey = localStorage.authKey;
          $state.go("app.dashboardMatches");
        }

      }, function (error) { debugger


      });
    }

    // Login starts from here
    $scope.user = {}
    $scope.Login = function (user) {
      debugger;
      $scope.loadingEvent();

      $http({
        url: __env.apiUrl + '/auth/login',
        method: "POST",
        data: $scope.user,
        headers: { 'Content-Type': 'application/json' }
      }).then(function successCallback(response) { 
        $ionicLoading.hide();
        if (response.status == 200) {
          $window.localStorage['authKey'] = response.data.key;
          $window.localStorage['token'] = response.data.token;
          $http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.token;
          $http.defaults.headers.common.appKey = localStorage.authKey;
          $state.go("app.dashboardMatches");
       
        }
      }, function errorCallback(error) { debugger
        $ionicLoading.hide();
        


      });
    }


  }])