'use strict';

exports.inject = function(app) {
    app.controller('LoginCtrl', exports.controller);
    return exports.controller;
};

exports.controller = ['$scope', function ($scope) {
    $scope.foo = 'bar';
}];
