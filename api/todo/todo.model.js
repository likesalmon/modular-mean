'use strict';

var todos = [
    {
        id: 1,
        title: 'First ToDo',
        description: 'This is the first todo',
        created: new Date(),
        modified: new Date()
    }
];

var findAll = function (callback) {
    return callback(null, todos);
};

var findOne = function (id, callback) {
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) return callback(null, todos[i]);
    }

    return callback(null, {});
};

module.exports = {
    findAll: findAll,
    findOne: findOne
};
