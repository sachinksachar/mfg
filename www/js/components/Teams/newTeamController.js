angular.module('mfg').controller('newTeamCtrl', ['$http', '$scope', '$state', '$stateParams', '$filter', '$ionicModal', '$ionicPopup', '$ionicLoading', '$ionicPlatform', '$timeout', '$ionicTabsDelegate', '$ionicSlideBoxDelegate', '$window',
  function ($http, $scope, $state, $stateParams, $filter, $ionicModal, $ionicPopup, $ionicLoading, $ionicPlatform, $timeout, $ionicTabsDelegate, $ionicSlideBoxDelegate, $window) {

    $scope.backButton = function () {
      $state.go('contestCategory')
    }

    $scope.version_id = '1.0';
    $scope.local_match_data = JSON.parse(localStorage['local_match_data']);
    $scope.contestList = {};
    $http({
      url: __env.apiUrl + '/api/cricket/squad/rules/' + $scope.version_id,
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    }).then(function (response) {
      $scope.contestList = response.data;
    }, function (error) {


    });

    // players fetch
    $scope.players = {};

    $http({
      url: __env.apiUrl + '/api/cricket/squad/' + $scope.local_match_data.matchcode,
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    }).then(function (response) {
      $scope.players = response.data;
    }, function (error) {


    });

    // Sliding

    $scope.activeSlide = 0;
    $scope.slideChanged = function (index) {
      $ionicTabsDelegate.select(index);
    };

    $scope.setSlide = function (index) {
      $ionicSlideBoxDelegate.slide(index);
    };


  }])