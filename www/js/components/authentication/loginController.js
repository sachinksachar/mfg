angular.module('mfg').controller('loginCtrl', ['$http', '$scope', '$state', '$stateParams', '$filter', '$ionicModal', '$ionicPopup', '$ionicLoading', '$ionicPlatform', '$timeout', '$ionicTabsDelegate', '$ionicSlideBoxDelegate', '$window', 'ionicSuperPopup',
  function ($http, $scope, $state, $stateParams, $filter, $ionicModal, $ionicPopup, $ionicLoading, $ionicPlatform, $timeout, $ionicTabsDelegate, $ionicSlideBoxDelegate, $window, ionicSuperPopup) {

    $scope.emailphoneRE = /^(?:\d{10}|\w+@\w+\.\w{2,3})$/;
    $scope.passwordRE = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;
    $scope.usernameRE = /^[A-Za-z\s]+$/;
    $scope.mobilenoRE = /^[0-9]{10}$/;


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

    var backbutton = 0;
    $ionicPlatform.registerBackButtonAction(function (event) {
      if ($state.current.name == "login") {

        if (backbutton == 0) {
          backbutton++;

        } else {
          ionic.Platform.exitApp();
        }
      }
      else {
        navigator.app.backHistory();
      }
    }, 100);

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

        if (response.status == 200) {
          $window.localStorage['authKey'] = response.data.key;
          $window.localStorage['token'] = response.data.token;
          $http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.token;
          $http.defaults.headers.common.appKey = localStorage.authKey;
          $state.go("app.dashboardMatches");
        }

      }, function (error) {
        debugger

        if (error.status == 400) {
          ionicSuperPopup.show("Error!", error.data.errors, "error");
        }
        else if (error.status == 500) {
          if (typeof (error.data.errors) == 'string') {
            ionicSuperPopup.show("Error!", error.data.errors, "error");
          }
          else if (typeof (error.data.errors) == 'object') {
            $scope.regerrormsg = [];
            angular.forEach(error.data.errors, function (val, key) {
              $scope.errormsg.push(val);
            })
            ionicSuperPopup.show("Error!", $scope.regerrormsg[0] + "," + $scope.regerrormsg[1], "error");
          }
        }

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
      }, function errorCallback(error) {
        debugger
        if (error.status == 400) {
          ionicSuperPopup.show("Error!", error.data.errors, "error");
        }
        else if (error.status == 500) {
          if (typeof (error.data.errors) == 'string') {
            ionicSuperPopup.show("Error!", error.data.errors, "error");
          }
          else if (typeof (error.data.errors) == 'object') {
            $scope.errormsg = [];
            angular.forEach(error.data.errors, function (val, key) {
              $scope.errormsg.push(val);
            })
            ionicSuperPopup.show("Error!", $scope.errormsg[0] + "&" + $scope.errormsg[1], "error");
          }
        }
        $ionicLoading.hide();
      });
    }


  }])