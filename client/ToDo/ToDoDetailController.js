'use strict';

module.exports = ['$scope', '$stateParams', 'ToDoService', function ($scope, $stateParams, ToDoService) {
    $scope.selected = ToDoService.one($stateParams.id);
}];
