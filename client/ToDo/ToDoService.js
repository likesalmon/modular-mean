'use strict';

var _ = require('lodash');
var moment = require('moment');

module.exports = function () {
    var todos = [
        {
            id: 1,
            title: 'First todo',
            description: 'This is the first thing to do.',
            created: moment().startOf('hour').format(),
            modified: moment().startOf('hour').format()
        },
        {
            id: 2,
            title: 'Second todo',
            description: 'This is the second thing to do.',
            created: moment().startOf('day').format(),
            modified: moment().startOf('day').format()
        }
    ];

    var all = function () {
        return todos;
    };

    var one = function (id) {
        return _.find(todos, { 'id': parseInt(id) });
    };

    var create = function (todo) {
        todo.id = _.random(0, 9999);
        todo.created = moment().format();
        todo.modified = moment().format();
        todos.push(todo);

        return todo;
    };

    var update = function (todo) {
        var currentRecord = _.find(todos, 'id', todo.id);
        currentRecord.title = todo.title;
        currentRecord.description = todo.description;
        currentRecord.modified = moment().format();
    };

    var remove = function (id) {
        var index = _.findIndex(todos, 'id', id);
        todos.splice(index, 1);
    };

    return {
        all: all,
        one: one,
        create: create,
        update: update,
        remove: remove
    };
};
