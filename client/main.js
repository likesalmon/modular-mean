'use strict';

<<<<<<< HEAD
var angular = require('angular-bsfy');
=======
require('angular');
// var _ = require('lodash');

>>>>>>> origin/master
var uiRoute = require('angular-ui-router');
var Dashboard = require('./Dashboard');
var ToDo = require('./ToDo');

var app = angular.module('MyApp', [
    uiRoute,
    ToDo.name,
    Dashboard.name
]);

app.config(['$locationProvider', '$stateProvider','$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('dashboard', {
            url: '/',
            controller: require('./Dashboard/Dashboard.ctrl.js'),
            templateUrl: './Dashboard/Dashboard.html'
        })
        .state('login', {
            url: '/login',
            controller: require('./Login/Login.ctrl.js'),
            templateUrl: './Login/Login.html'
        })
        .state('todo', {
            url: '/todo',
<<<<<<< HEAD
            controller: require('./ToDo/ToDo.ctrl.js'),
=======
            controller: require('./ToDo/ToDo.ctrl.js').inject(app),
>>>>>>> origin/master
            templateUrl: './ToDo/ToDo.html'
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
