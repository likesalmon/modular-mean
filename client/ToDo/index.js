'use strict';

var angular = require('angular');
var confirmButtonDirective = require('./ToDoConfirmButtonDirective');

module.exports = angular.module('ToDo', [])
    .directive('confirmButton', require('./ToDoConfirmButtonDirective.js'));
