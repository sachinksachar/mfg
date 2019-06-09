app.controller('AppCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout, $http) {
    $scope.games = {};

    $http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.token;
    $http.defaults.headers.common.appKey = localStorage.authKey;

    
    $http({
        url: __env.apiUrl + '/api/games',
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      }).then(function (response) { 
        $scope.games = response.data;
        $scope.selectedGame = { value: "" };

      }, function (error) {
        
  
      });

      $scope.changeGame = function(game){
        
      }



});