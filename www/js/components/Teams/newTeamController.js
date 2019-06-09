angular.module('mfg').controller('newTeamCtrl', ['$http', '$scope', '$state', '$stateParams', '$filter', '$ionicModal', '$ionicPopup', '$ionicLoading', '$ionicPlatform', '$timeout', '$ionicTabsDelegate', '$ionicSlideBoxDelegate', '$window',
    function ($http, $scope, $state, $stateParams, $filter, $ionicModal, $ionicPopup, $ionicLoading, $ionicPlatform, $timeout, $ionicTabsDelegate, $ionicSlideBoxDelegate, $window) {

        debugger

        $scope.backButton = function(){
            $state.go('contestCategory')
        }

        $scope.version_id = '1.0';
        $scope.local_match_data = JSON.parse(localStorage['local_match_data']);
        $scope.contestList = {};
        $http({
            url: __env.apiUrl + '/api/cricket/squad/rules/'+$scope.version_id,
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
          }).then(function (response) { debugger
            $scope.contestList = response.data;    
          }, function (error) { debugger
            
      
          });


    }])