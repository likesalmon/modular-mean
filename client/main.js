'use strict';

require('angular');

var uiRoute = require('angular-ui-router');
var app = angular.module('MyApp', [uiRoute]);

app.config(function($locationProvider, $stateProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('home', {
            url: '/',
            controller: require('./Login/home.ctrl.js').inject(app),
            templateUrl: './home/home.html'
        });

});

app.run();
