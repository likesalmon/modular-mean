'use strict';

exports.inject = function(app) {
    app.controller('TodoCtrl', exports.controller);
    return exports.controller;
};

exports.controller = function ($scope) {
    $scope.foo = 'bar';
};
