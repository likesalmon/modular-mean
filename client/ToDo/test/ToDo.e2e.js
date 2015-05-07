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

    describe('todo list', function () {
        it('should start with 2 todos', function () {
            expect(page.todoList.count()).to.eventually.equal(2);
        });

        it('should have a title and description', function () {
            page.todoList.each(function (el, index) {
                expect(el.$('button').$('h3').isPresent()).to.eventually.equal(true);
            });
        });

        it('should show a detail view on click', function (done) {
            this.timeout(10000);

            function testUrl () {
                browser.getCurrentUrl().then(function (url) {
                    var pieces = url.split('/');
                    expect(parseInt(pieces[pieces.length - 1])).to.be.a('number');
                });
            }

            function testContent () {
                var content = element(by.css('#content'));
                expect(content.$('.title').isPresent()).to.eventually.be.true;
                expect(content.$('.description').isPresent()).to.eventually.be.true;
            }

            page.todoList.each(function (el, index) {
                el.click().then(testUrl).then(testContent);
            }).then(done);
        });
    });

    describe('search', function () {
        it('should filter the results', function (done) {
            expect(page.todoList.count()).to.eventually.equal(2);
            // expect(page.todoList.getAttribute('value')).to.eventually.equal('');

            page.search
                .sendKeys('first')
                .then(function () {
                    expect(page.todoList.count()).to.eventually.equal(1);
                })
                .then(function () {
                    page.search.clear();
                    expect(page.todoList.count()).to.eventually.equal(2);
                })
                .then(function () {
                    page.search.sendKeys('second');
                    expect(page.todoList.count()).to.eventually.equal(1);
                })
                .then(done);
        });
    });

    describe('new button', function () {
        it('should change state to /todo/new', function (done) {
            page.newButton.click().then(function () {
                browser.getCurrentUrl().then(function (url) {
                    var pieces = url.split('/');
                    expect(pieces[pieces.length - 1]).to.equal('new');
                    done();
                });
            });
        });
    });
});
