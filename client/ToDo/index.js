'use strict';

var angular = require('angular');

var app = angular.module('ToDo', []);
app.directive('confirmButton', require('./ToDoConfirmButtonDirective.js'));


module.exports = app;
