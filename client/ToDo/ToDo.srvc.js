'use strict';

var _ = require('lodash');

module.exports = function () {
    var todos = [
        {
            id: 1,
            title: 'Example Todo',
            description: 'This is an example.',
            created: new Date(),
            modified: new Date()
        }
    ];

    var all = function () {
        return todos;
    };

    var one = function (id) {
        return _.find(todos, { 'id': id });
    };

    var create = function (todo) {
        todos.push(todo);
    };

    var remove = function (id) {
        var index = _.findIndex(todos, 'id', id);
        todos = todos.splice(index, 1);
    };

    return {
        all: all,
        one: one,
        create: create,
        remove: remove
    };
};
