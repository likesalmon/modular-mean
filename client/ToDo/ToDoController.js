'use strict';

module.exports = ['$scope', 'ToDoService', function ($scope, ToDoService) {
    $scope.todos = ToDoService.all();

    $scope.selected = $scope.todos[0];

    $scope.select = function (item) {
        $scope.selected = item;
    };
}];
