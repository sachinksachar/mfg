angular.module('mfg').controller('dashboardMatchesCtrl', ['$http', '$scope', '$state', '$stateParams', '$filter', '$ionicModal', '$ionicPopup', '$ionicLoading', '$ionicPlatform', '$timeout', '$ionicTabsDelegate', '$ionicSlideBoxDelegate', '$window',
  function ($http, $scope, $state, $stateParams, $filter, $ionicModal, $ionicPopup, $ionicLoading, $ionicPlatform, $timeout, $ionicTabsDelegate, $ionicSlideBoxDelegate, $window) {

    var backbutton = 0;
    $ionicPlatform.registerBackButtonAction(function (event) {
      if ($state.current.name == "app.dashboardMatches") {

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

    $scope.matches = {};
    $scope.local_match_data = {
      matchcode: "",
      levelcode: "",
      contestLevels: "",
      contestList: ""
    }
    $window.localStorage['local_match_data'] = JSON.stringify($scope.local_match_data);
    $http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.token;
    $http.defaults.headers.common.appKey = localStorage.authKey;

    $http({
      url: __env.apiUrl + '/api/cricket/matches',
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    }).then(function (response) {

      $scope.matches = response.data.matches;

    }, function (error) {


    });


    $scope.showContestCategory = function (mcode) {
      $scope.local_match_data.matchcode = mcode
      $window.localStorage['local_match_data'] = JSON.stringify($scope.local_match_data);
      $state.go('contestCategory')
    }




  }])