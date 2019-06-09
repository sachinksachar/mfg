angular.module('mfg').controller('contestCategoryCtrl', ['$http', '$scope', '$state', '$stateParams', '$filter', '$ionicModal', '$ionicPopup', '$ionicLoading', '$ionicPlatform', '$timeout', '$ionicTabsDelegate', '$ionicSlideBoxDelegate', '$window',
    function ($http, $scope, $state, $stateParams, $filter, $ionicModal, $ionicPopup, $ionicLoading, $ionicPlatform, $timeout, $ionicTabsDelegate, $ionicSlideBoxDelegate, $window) {

        

        $scope.backButton = function(){
            $state.go('app.dashboardMatches');
            delete localStorage['local_match_data']
        }

        $scope.local_match_data = JSON.parse(localStorage['local_match_data']);
        $scope.contestLevels = {};
        $http({
            url: __env.apiUrl + '/api/cricket/contests/'+$scope.local_match_data.matchcode,
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
          }).then(function (response) { 
            $scope.contestLevels = response.data;    
          }, function (error) { 
            
      
          });

          $scope.showContestList = function(lvlcode){ 
            $scope.local_match_data.levelcode = lvlcode;
            $window.localStorage['local_match_data'] = JSON.stringify($scope.local_match_data);
            $state.go('contestList')
          }

          // create a team

          $scope.createTeam = function(){
              $state.go('newTeam');
          }


    }])