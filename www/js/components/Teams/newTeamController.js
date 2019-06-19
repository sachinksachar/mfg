angular.module('mfg').controller('newTeamCtrl', ['$http', '$scope', '$state', '$stateParams', '$filter', '$ionicModal', '$ionicPopup', '$ionicLoading', '$ionicPlatform', '$timeout', '$ionicTabsDelegate', '$ionicSlideBoxDelegate', '$window',
  function ($http, $scope, $state, $stateParams, $filter, $ionicModal, $ionicPopup, $ionicLoading, $ionicPlatform, $timeout, $ionicTabsDelegate, $ionicSlideBoxDelegate, $window) {

    $scope.backButton = function () {
      $state.go('contestCategory')
    }

    $scope.version_id = '1.0';
    $scope.local_match_data = JSON.parse(localStorage['local_match_data']);
    $scope.contestList = {};
    $scope.points = 0;
    $scope.team1 = 0;
    $scope.team2 = 0;
    $scope.team_members = {}
    $scope.team_members_count = {}
    $scope.player_visiblity = true;

    $http({
      url: __env.apiUrl + '/api/cricket/squad/rules/' + $scope.version_id,
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    }).then(function (response) {
      $scope.contestList = response.data;
      $scope.points = $scope.contestList.rules[0].totalCredit;
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

    $scope.makeTeam = function(code, status, role,teams,player_point) {
        $scope.team = {}
        if(status){

          if($scope.team_members[teams] === undefined){
            $scope.team_members[teams] = {}
          }
          if($scope.team_members[teams][role] === undefined){
            $scope.team_members[teams][role] = []
          }
          $scope.team_members[teams][role].push(code);
          $scope.points = $scope.points - player_point;
          member_count_section = $scope.team_members[teams][role].length
          $scope.team_size = $scope.member_in_team($scope.team_members[teams])
          $scope.both_team_size = $scope.member_in_both_team($scope.team_members)
          $scope.condition_check = $scope.check_rules(member_count_section,role,teams,$scope.contestList)
          $scope.player_visiblity = false;
          if($scope.team_members <= $scope.contestList.rules[0].totalPlayers){

          }
        }
        else{
          index_data = $scope.team_members[teams][role].indexOf(code);
          $scope.team_members[teams][role].splice(index_data,1);
          $scope.points = $scope.points + player_point;
          $scope.team_size = $scope.member_in_team($scope.team_members[teams])
          $scope.both_team_size = $scope.member_in_both_team($scope.team_members)
          $scope.condition_check = $scope.check_rules(member_count_section,role,teams,$scope.contestList)
        }
        
        
    };


    $scope.check_rules = function(member_count_section, role, team, rules){
      min = rules.rules[0].conditions.limits[role][0];
      max = rules.rules[0].conditions.limits[role][1];
      
      if(member_count_section >= max)
      {
        return "Maximum of " + max + " player can be selected."
      }
          
    }

    $scope.member_in_team = function(teams)
    {
      count = 0
      angular.forEach(teams, function(value, key) {
        count = count + teams[key].length;
      });
      return count;
    }

    $scope.member_in_both_team = function(teams)
    {
      count = 0
      
      
      angular.forEach(teams, function(value, key) {
        $scope.team_members_count[key] = []
        count = 0;
        angular.forEach(teams[key], function(val, k) {
          count = count + teams[key][k].length;
          $scope.team_members_count[key] = count; 
        });
      });
      
      return count;
    }



    // Sliding

    $scope.activeSlide = 0;
    $scope.slideChanged = function (index) {
      $ionicTabsDelegate.select(index);
    };

    $scope.setSlide = function (index) {
      $ionicSlideBoxDelegate.slide(index);
    };




  }])