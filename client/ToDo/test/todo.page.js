'use strict';

var helper = require('../../helpers/test.helper.js');

function ToDoPage () {
    this.get = function() {
        browser.get(helper.rootUrl + '/todo');
    };

    this.foo = element(by.binding('foo'));
}

module.exports = ToDoPage;
