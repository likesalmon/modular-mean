'use strict';

module.exports = ['$scope', 'ToDoService', function ($scope, ToDoService) {
    $scope.todos = ToDoService.all();

    $scope.select = function (item) {
        $scope.todos.forEach(function (todo) {
            todo.selected = false;
        });
        item.selected = true;
        
        $scope.selected = item;
    };

}];
