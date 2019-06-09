var app = angular.module('mfg', ['ionic', 'ionic-material', 'oc.lazyLoad','ion-floating-menu']);

app.run(function ($ionicPlatform, AuthService) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})



app.factory('AuthService', [
    '$location', '$window', '$http', '$state', '$stateParams',
    function ($location, $window, $http, $state, $stateParams) { 
        
        
        if (localStorage.authKey == undefined && localStorage.token == undefined) {
            $state.go('login');
        }
        else { 
            $http.defaults.headers.common.Authorization = 'Bearer '+ localStorage.token;
            $http.defaults.headers.common.appKey = localStorage.authKey;
        }
        return 0;
    }])

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider


        .state('login', {
            cache: false,
            url: '/login',
            templateUrl: 'templates/Login/signin.html',
            controller: 'loginCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: "mfg",
                        files: [
                            'js/components/authentication/loginController.js'
                        ]
                    });
                }]
            }

        })

        .state('contestCategory', {
            cache: false,
            url: '/contestCategory',
            templateUrl: 'templates/ContestCategory/ContestCategory.html',
            controller: 'contestCategoryCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: "mfg",
                        files: [
                            'js/components/ContestCategory/contestCategoryController.js'
                        ]
                    });
                }]
            }
        })


        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })

        // .state('app.login', {
        //     cache: false,
        //     url: '/login',
        //     views: {
        //         'menuContent': {
        //             templateUrl: 'templates/Login/signin.html',
        //             controller: 'loginCtrl',
        //         }
        //     },

        //     resolve: {
        //       deps: ['$ocLazyLoad', function ($ocLazyLoad) {
        //         return $ocLazyLoad.load({
        //           name: "mfg",
        //           files: [
        //             'js/components/authentication/loginController.js'
        //           ]
        //         });
        //       }]
        //     }

        //   })

        .state('app.lists', {
            url: '/lists',
            views: {
                'menuContent': {
                    templateUrl: 'templates/lists.html',
                    controller: 'ListsCtrl'
                }
            }
        })

        .state('app.ink', {
            url: '/ink',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ink.html',
                    controller: 'InkCtrl'
                }
            }
        })



        

        .state('app.motion', {
            url: '/motion',
            views: {
                'menuContent': {
                    templateUrl: 'templates/motion.html',
                    controller: 'MotionCtrl'
                }
            }
        })

        .state('app.components', {
            url: '/components',
            views: {
                'menuContent': {
                    templateUrl: 'templates/components.html',
                    controller: 'ComponentsCtrl'
                }
            }
        })

        .state('app.extensions', {
            url: '/extensions',
            views: {
                'menuContent': {
                    templateUrl: 'templates/extensions.html',
                    controller: 'ExtensionsCtrl'
                }
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: "mfg",
                        files: [
                            'js/controllers/ExtensionsCtrl.js'
                        ]
                    });
                }]
            }
        })

        .state('app.myMatches', {
            url: '/myMatches',
            views: {
                'menuContent': {
                    templateUrl: 'templates/MyMatches/myMatch.html',
                    controller: 'myMatchCtrl'
                }
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: "mfg",
                        files: [
                            'js/components/myMatches/MyMatchesController.js'
                        ]
                    });
                }]
            }
        })


        .state('app.dashboardMatches', {
            url: '/dashboardMatches',
            views: {
                'menuContent': {
                    templateUrl: 'templates/Matches/dashboardMatches.html',
                    controller: 'dashboardMatchesCtrl'
                }
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: "mfg",
                        files: [
                            'js/components/Matches/dashboardMatchesController.js'
                        ]
                    });
                }]
            }
        })




        .state('contestList', {
            cache: false,
            url: '/contestList',
            templateUrl: 'templates/ContestList/ContestList.html',
            controller: 'contestListCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: "mfg",
                        files: [
                            'js/components/ContestList/contestListController.js'
                        ]
                    });
                }]
            }
        })

        .state('newTeam', {
            cache: false,
            url: '/newTeam',
            templateUrl: 'templates/Teams/newTeam.html',
            controller: 'newTeamCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: "mfg",
                        files: [
                            'js/components/Teams/newTeamController.js'
                        ]
                    });
                }]
            }
        })



    // if none of the above states are matched, use this as the fallback
    // $urlRouterProvider.otherwise('/login');

    if (localStorage.authKey == undefined && localStorage.token == undefined) {
        $urlRouterProvider.otherwise('/login');
      }
      else if (localStorage.authKey != undefined && localStorage.token != undefined) {
        $urlRouterProvider.otherwise('/app/dashboardMatches');
      }
});
