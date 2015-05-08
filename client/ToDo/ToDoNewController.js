'use strict';

module.exports = ['$scope', '$state', 'ToDoService', function ($scope, $state, ToDoService) {
    $scope.save = function (todo) {
        var newTodo = ToDoService.create(todo);
        $state.go('todo.detail', { id: newTodo.id });
    };
}];
