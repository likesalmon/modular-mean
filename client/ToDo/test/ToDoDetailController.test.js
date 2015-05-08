'use strict';

var expect = require('chai').expect;
var ToDoDetailController = require('../ToDoDetailController');
var ToDoService = require('../ToDoService');

describe('ToDoDetailController', function () {
    var Controller,
        scope,
        stateParams,
        went,
        Service,
        firstTodo;

    beforeEach(function () {
        Service = new ToDoService();
        firstTodo = Service.all()[0];
        scope = {};
        went = {};
        stateParams = {
            id: firstTodo.id
        };

        Controller = new ToDoDetailController[ToDoDetailController.length - 1](scope, stateParams, Service);
    });

    describe('$scope.selected()', function () {
        it('should be a todo object', function () {
            expect(scope.selected).to.have.all.keys('id', 'title', 'description', 'created', 'modified');
            expect(scope.selected.title).to.equal(firstTodo.title);
            expect(scope.selected.description).to.equal(firstTodo.description);
        });
    });
});
