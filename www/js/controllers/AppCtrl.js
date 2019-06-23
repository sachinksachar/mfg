app.controller('AppCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout, $http, $ionicHistory, $window, $state, $ionicLoading) {
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


      $scope.logoutAction = function(){
        $ionicLoading.show({
          content: 'Loading',
          template: '<ion-spinner icon="lines" class="spinner-assertive"></ion-spinner>',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });

        $scope.logoutdate = {}
        $http({
          url: __env.apiUrl + '/auth/logout',
          method: "GET",
          headers: { 'Content-Type': 'application/json' }
        }).then(function (response) { 
          $scope.logoutdate = response.data.status;
          $window.localStorage.clear();
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
          
          $timeout(function(){
            $ionicLoading.hide()
            $state.go('login');
          }, 1000)
         
        }, function (error) { 
          if(error.status == 401){
            $window.localStorage.clear();
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            
            $timeout(function(){
              $ionicLoading.hide()
              $state.go('login');
            }, 1000)
          }
        });
      }



});