'use strict';

var angular = require('angular');
var uiRoute = require('angular-ui-router');
var Navigation = require('./Navigation');
var Dashboard = require('./Dashboard');
var ToDo = require('./ToDo');

var app = angular.module('MyApp', [
    uiRoute,
    ToDo.name,
    Dashboard.name,
    Navigation.name
]);

app.config(['$locationProvider', '$stateProvider','$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            controller: 'DashboardController',
            templateUrl: './Dashboard/Dashboard.html'
        })
        .state('todo', {
            url: '/todo',
            controller: 'ToDoController',
            templateUrl: './ToDo/ToDo.html'
        })
        .state('todo.detail', {
            url: '/:id',
            controller: 'ToDoDetailController',
            templateUrl: './ToDo/ToDoDetail.html'
        })
        .state('todo.new', {
            url: '/new',
            controller: 'ToDoNewController',
            templateUrl: './ToDo/ToDoNew.html'
        });

        $urlRouterProvider.otherwise('/dashboard');
}]);

app.filter('unsafe', ['$sce', function($sce) {
    return $sce.trustAsHtml;
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
