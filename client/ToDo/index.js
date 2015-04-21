'use strict';

var angular = require('angular');
var angularMaterial = require('angular-material');
var angularAnimate = require('angular-animate');
var angularAria = require('angular-aria');
var confirmButtonDirective = require('./ToDoConfirmButtonDirective');

module.exports = angular.module('ToDo', ['ngMaterial', 'ngAnimate', 'ngAria'])
    .directive('confirmButton', require('./ToDoConfirmButtonDirective'))
    .controller('ToDoController', require('./ToDoController'));
