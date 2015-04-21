'use strict';

var helper = require('../../helpers/test.helper.js');

function ToDoPage () {
    this.get = function() {
        browser.get(helper.rootUrl + '/todo');
    };

    this.banner = element(by.css('#banner'));
    this.newButton = element(by.css('#new-todo'));
    this.todoList = element.all(by.repeater('todo in todos'));
    this.search = element(by.model('search'));
}

module.exports = ToDoPage;
