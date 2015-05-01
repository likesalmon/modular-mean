'use strict';

var angular = require('angular');
var angularMaterial = require('angular-material');
var angularAnimate = require('angular-animate');
var angularAria = require('angular-aria');
require('../../node_modules/angular-material-icons/angular-material-icons');

module.exports = angular.module('Dashboard', ['ngMaterial', 'ngAnimate', 'ngAria', 'ngMdIcons'])
    .controller('DashboardController', require('./DashboardController'));
