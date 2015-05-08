'use strict';

var expect = require('chai').expect;
var ToDoService = require('../ToDoService');
var moment = require('moment');
var _ = require('lodash');

describe('ToDoService', function () {
    var Service;

    beforeEach(function () {
        Service = new ToDoService();
    });

    it('should exist', function () {
        expect(!!Service).to.be.true;
    });

    describe('all()', function () {
        it('should return an array', function () {
            expect(Service.all()).to.be.an('array');
        });

        it('should return two example todos', function () {
            var todos = Service.all();

            expect(todos).to.be.an('array');
            expect(todos.length).to.equal(2);

            todos.forEach(function (todo) {
                expect(todo.id).to.be.a('number');
                expect(todo.title).to.be.a('string');
                expect(todo.description).to.be.a('string');
                expect(moment(todo.created).isValid()).to.be.true;
                expect(moment(todo.modified).isValid()).to.be.true;
            });
        });
    });

    describe('create()', function () {
        it('should add a new todo', function () {
            var todo = {
                title: 'New todo',
                description: 'This is a brand new todo.'
            };

            var count = Service.all().length;
            Service.create(todo);
            var todos = Service.all();
            expect(todos.length).to.equal(count + 1);

            todos.forEach(function (todo) {
                expect(todo.id).to.be.a('number');
                expect(todo.title).to.be.a('string');
                expect(todo.description).to.be.a('string');
                expect(moment(todo.created).isValid()).to.be.true;
                expect(moment(todo.modified).isValid()).to.be.true;
            });
        });
    });

    describe('one()', function () {
        it('should return a single todo object', function () {
            var todo = {
                title: 'New todo',
                description: 'This is a brand new todo.'
            };

            Service.create(todo);

            var newTodo = Service.all()[2];

            expect(newTodo.id).to.equal(todo.id);
            expect(newTodo.title).to.equal(todo.title);
            expect(newTodo.description).to.equal(todo.description);
            expect(moment(newTodo.created).isValid()).to.be.true;
            expect(moment(newTodo.modified).isValid()).to.be.true;
        });
    });

    describe('update()', function () {
        it('should update a todo', function () {
            var todos = Service.all();

            var title = 'Updated todo';
            var description = 'Updated description';
            var modified = todos[0].modified;

            todos[0].title = title;
            todos[0].description = description;

            Service.update(todos[0]);

            var updatedTodo = Service.one(todos[0].id);

            expect(updatedTodo.title).to.equal(title);
            expect(updatedTodo.description).to.equal(description);
            expect(moment(updatedTodo.modified).isAfter(modified)).to.be.true;
        });
    });

    describe('remove()', function () {
        it('should remove a todo and re-index', function () {
            var todos = Service.all();
            var count = todos.length;
            var second = _.clone(todos[1]);

            Service.remove(todos[0].id);

            var minusOneTodo = Service.all();

            expect(minusOneTodo.length).to.equal(count - 1);
            expect(minusOneTodo[0]).to.deep.equal(second);
        });
    });
});
