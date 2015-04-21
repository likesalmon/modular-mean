'use strict';

var helper = require('../../helpers/test.helper.js');
var expect = helper.expect;
var ToDoPage = require('./ToDo.page');

describe('todo landing page', function() {
    beforeEach(function () {
        this.page = new ToDoPage();
        this.page.get();
    });

    describe('title', function () {
        it('should have a title', function () {
            expect(this.page.banner.getText()).to.eventually.equal('To Do');
        });
    });

    describe('new button', function () {
        it('should have a button that creates a new todo', function () {
            expect(this.page.newButton.getText()).to.eventually.equal('+');
        });
    });

    describe('todos', function () {
        it('should start with 2 todos', function () {
            expect(this.page.todoList.count()).to.eventually.equal(2);
        });

        it('should have a title and description', function () {
            this.page.todoList.each(function (el, index) {
                expect(el.$('button').$('h3').isPresent()).to.eventually.equal(true);
            });
        });
    });
});
