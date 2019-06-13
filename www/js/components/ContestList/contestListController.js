angular.module('mfg').controller('contestListCtrl', ['$http', '$scope', '$state', '$stateParams', '$filter', '$ionicModal', '$ionicPopup', '$ionicLoading', '$ionicPlatform', '$timeout', '$ionicTabsDelegate', '$ionicSlideBoxDelegate', '$window',
    function ($http, $scope, $state, $stateParams, $filter, $ionicModal, $ionicPopup, $ionicLoading, $ionicPlatform, $timeout, $ionicTabsDelegate, $ionicSlideBoxDelegate, $window) {

        $scope.backButton = function () {
            $state.go('contestCategory')
        }

        $scope.local_match_data = JSON.parse(localStorage['local_match_data']);
        $scope.contestList = {};
        $http({
            url: __env.apiUrl + '/api/cricket/contests/' + $scope.local_match_data.matchcode + '/' + $scope.local_match_data.levelcode,
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            $scope.contestList = response.data;
        }, function (error) {


        });

        // create a team
        $scope.createTeam = function () {
            $state.go('newTeam');
        }


    }])