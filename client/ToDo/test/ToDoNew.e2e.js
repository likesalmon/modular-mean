'use strict';

var helper = require('../../helpers/test.helper.js');
var expect = helper.expect;
var ToDoNewPage = require('./ToDoNew.page');

describe('todo landing page', function() {
    var page;

    beforeEach(function () {
        page = new ToDoNewPage();
        page.get();
    });

    describe('page elements', function () {
        it('should have a title', function () {
            expect(page.title.isPresent()).to.eventually.be.true;
            expect(page.form.isPresent()).to.eventually.be.true;
            expect(page.titleInput.isPresent()).to.eventually.be.true;
            expect(page.descriptionTextarea.isPresent()).to.eventually.be.true;
            expect(page.saveButton.isPresent()).to.eventually.be.true;
        });
    });

    describe('submit button', function () {
        it('should be disabled until a title is added', function (done) {
            expect(page.saveButton.isEnabled()).to.eventually.be.false;

            page.addContentToTitleInput('foo')
            .then(function () {
                expect(page.saveButton.isEnabled()).to.eventually.be.true;
            });
        });

        it('should create a new todo on submit and go to the detail page', function (done) {
            this.timeout(5000);
            var title = 'foo';
            var description = 'bar';
            var addTitle = page.addContentToTitleInput.bind(null, title);
            var addDescription = page.addContentToTextarea.bind(null, description);

            var testUrl = function () {
                return browser.getCurrentUrl().then(function (url) {
                    var pieces = url.split('/');
                    expect(parseInt(pieces[pieces.length - 1])).to.be.a('number');
                });
            };

            var testContent = function () {
                expect(page.content.$('.title').getText()).to.eventually.equal(title);
                expect(page.content.$('.description').getText()).to.eventually.equal(description);
            };

            addTitle()
            .then(addDescription)
            .then(page.clickSaveButton)
            .then(testUrl)
            .then(testContent)
            .then(done);
        });
    });
});
