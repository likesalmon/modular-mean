'use strict';

var helper = require('../../helpers/test.helper.js');

module.exports = function () {
    var get = function() {
        browser.get(helper.rootUrl + '/todo');
    };

    var todoList = element.all(by.repeater('todo in todos'));
    var search = element(by.model('search'));

    return {
        get: get,
        todoList: todoList,
        search: search
    };
};
