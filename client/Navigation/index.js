'use strict';

var angular = require('angular');
var ngMaterial = require('angular-material');

module.exports = angular.module('Navigation', [ngMaterial])
    .controller('NavigationController', require('./NavigationController'))
    .factory('NavigationService', require('./NavigationService'));
