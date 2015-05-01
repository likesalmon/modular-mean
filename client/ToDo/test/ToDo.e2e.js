'use strict';

var helper = require('../../helpers/test.helper.js');
var expect = helper.expect;
var ToDoPage = require('./ToDo.page');

describe('todo landing page', function() {
    var page;

    beforeEach(function () {
        page = new ToDoPage();
        page.get();
    });

    describe('todos', function () {
        it('should start with 2 todos', function () {
            expect(page.todoList.count()).to.eventually.equal(2);
        });

        it('should have a title and description', function () {
            page.todoList.each(function (el, index) {
                expect(el.$('button').$('h3').isPresent()).to.eventually.equal(true);
            });
        });
    });
});
