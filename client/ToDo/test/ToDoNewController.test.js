'use strict';

var expect = require('chai').expect;
var ToDoNewController = require('../ToDoNewController');
var ToDoService = require('../ToDoService');

describe('ToDoNewController', function () {
    var Controller,
        scope,
        state,
        went,
        Service;

    beforeEach(function () {
        scope = {};
        went = {};
        state = {
            go: function (where, params) {
                went = {
                    where: where,
                    params: params
                };
            }
        };
        Service = new ToDoService();

        Controller = new ToDoNewController[ToDoNewController.length - 1](scope, state, Service);
    });

    describe('$scope.save()', function () {
        it('should save a new todo and go to the todo.detail page', function () {
            var todo = {
                title: 'New todo',
                description: 'This is a description.'
            };

            expect(Service.all().length).to.equal(2);

            scope.save(todo);
            var todos = Service.all();
            var newTodo = todos[2];

            expect(todos.length).to.equal(3);
            expect(newTodo).to.have.all.keys('id', 'title', 'description', 'created', 'modified');
            expect(newTodo.title).to.equal(todo.title);
            expect(newTodo.description).to.equal(todo.description);

            expect(went.where).to.equal('todo.detail');
            expect(went.params.id).to.equal(newTodo.id);
        });
    });
});
