angular.module('mfg').controller('loginCtrl', ['$http', '$scope', '$state','$stateParams','$filter','$ionicModal','$ionicPopup','$ionicLoading', '$ionicPlatform','$timeout',
function($http, $scope, $state,$stateParams,$filter,$ionicModal,$ionicPopup,$ionicLoading, $ionicPlatform,$timeout) {

    $scope.tab = 1;
    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };
  
    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };
    


}])