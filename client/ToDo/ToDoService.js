'use strict';

var _ = require('lodash');
var moment = require('moment');

module.exports = function () {
    var todos = [
        {
            id: _.random(0, 9999),
            title: 'First todo',
            description: 'This is the first thing to do.',
            created: moment().startOf('hour').format(),
            modified: moment().startOf('hour').format()
        },
        {
            id: _.random(0, 9999),
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
