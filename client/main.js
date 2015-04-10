'use strict';

require('angular');
var _ = require('lodash');

var uiRoute = require('angular-ui-router');
var app = angular.module('MyApp', [uiRoute]);

app.config(['$locationProvider', '$stateProvider','$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('dashboard', {
            url: '/',
            controller: require('./Dashboard/dashboard.ctrl.js').inject(app),
            templateUrl: './Dashboard/dashboard.html'
        })
        .state('login', {
            url: '/login',
            controller: require('./Login/login.ctrl.js').inject(app),
            templateUrl: './Login/login.html'
        })
        .state('todo', {
            url: '/todo',
            controller: require('./Todo/todo.ctrl.js').inject(app),
            templateUrl: './Todo/todo.html'
        });

        $urlRouterProvider.otherwise('/');
}]);

// app.run(['$state', '$rootScope', function ($state, $rootScope) {
//     // var authNotRequired = ['/login', '/todo'];
//     //
//     // var authIsRequired = function (route) {
//     //     _.find(authNotRequired, function (noAuthRoute) {
//     //         return _.str.startsWith(route, noAuthRoute);
//     //     });
//     // };
//     // debugger
//     $rootScope.on('$routeChangeStart', function () {
//         // if (authIsRequired) {
//         //     $state.go('dashboard');
//         // }
//         console.log($state.current);
//     });
// }]);
app.run();
