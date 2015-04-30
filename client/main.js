'use strict';

var angular = require('angular');
var uiRoute = require('angular-ui-router');
var Navigation = require('./Navigation');
var ToDo = require('./ToDo');

var app = angular.module('MyApp', [
    uiRoute,
    ToDo.name,
    Navigation.name
]);

app.config(['$locationProvider', '$stateProvider','$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('todo', {
            url: '/',
            controller: 'ToDoController',
            templateUrl: './ToDo/ToDo.html'
        });

        $urlRouterProvider.otherwise('/');
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
