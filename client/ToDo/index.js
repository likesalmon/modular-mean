'use strict';

var angular = require('angular');
var angularMaterial = require('angular-material');
var angularAnimate = require('angular-animate');
var angularAria = require('angular-aria');
require('../../node_modules/angular-material-icons/angular-material-icons');

module.exports = angular.module('ToDo', ['ngMaterial', 'ngAnimate', 'ngAria', 'ngMdIcons'])
    .directive('confirmButton', require('./ToDoConfirmButtonDirective'))
    .controller('ToDoController', require('./ToDoController'))
    .factory('ToDoService', require('./ToDoService'));
