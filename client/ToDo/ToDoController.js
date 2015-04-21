'use strict';

module.exports = ['$scope', function ($scope) {
    $scope.todos = [
        {
            title: 'First todo',
            description: '<p>This is the first thing to do.</p>'
        },
        {
            title: 'Second todo',
            description: '<p>This is the second thing to do.</p>'
        }
    ];
}];
