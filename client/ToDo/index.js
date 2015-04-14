'use strict';

var angular = require('angular-bsfy');

var app = angular.module('ToDo', []);
app.directive('confirmButton', require('./ToDoConfirmButton.drct.js'));


module.exports = app;
