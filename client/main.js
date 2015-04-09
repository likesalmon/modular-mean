'use strict';

require('angular');

var uiRoute = require('angular-ui-router');
var app = angular.module('MyApp', [uiRoute]);

app.config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('dashboard', {
            url: '/',
            controller: require('./dashboard/dashboard.ctrl.js').inject(app),
            templateUrl: './dashboard/dashboard.html'
        })
        .state('login', {
            url: '/login',
            controller: require('./login/login.ctrl.js').inject(app),
            templateUrl: './login/login.html'
        })
        .state('todo', {
            url: '/todo',
            controller: require('./todo/todo.ctrl.js').inject(app),
            templateUrl: './todo/todo.html'
        });
}]);

app.run();
