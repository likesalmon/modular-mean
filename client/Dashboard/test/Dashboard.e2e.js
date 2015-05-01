'use strict';

var helper = require('../../helpers/test.helper.js');
var expect = helper.expect;
var ToDoPage = require('./Dashboard.page');

describe('todo landing page', function() {
    var page;

    beforeEach(function () {
        page = new ToDoPage();
        page.get();
    });

    xdescribe('title', function () {
        it('should have a title', function () {
            expect(page.banner.getText()).to.eventually.equal('To Do');
        });
    });
});
