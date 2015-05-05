'use strict';

module.exports = ['$scope', 'ToDoService', function ($scope, ToDoService) {
    $scope.todos = ToDoService.all();
}];
