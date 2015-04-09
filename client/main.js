'use strict';

require('angular');

var uiRoute = require('angular-ui-router');
var app = angular.module('MyApp', [uiRoute]);

app.config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('todo', {
            url: '/',
            controller: require('./todo/todo.ctrl.js').inject(app),
            templateUrl: './todo/todo.html'
        });
}]);

app.run();
