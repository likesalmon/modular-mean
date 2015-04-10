'use strict';

var helper = require('../../helpers/test.helper.js');
var expect = helper.expect;
var ToDoPage = require('./toDo.page');

describe('todo page', function() {
    beforeEach(function () {
        this.page = new ToDoPage();
        this.page.get();
    });

    it('should have a binding to foo', function() {
        expect(this.page.foo.getText()).to.eventually.equal('bar');
    });
});
