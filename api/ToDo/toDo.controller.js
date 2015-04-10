'use strict';

var _ = require('lodash');
var model = require('./toDo.model');

var all = function (callback) {
    model.findAll(function (err, results) {
        if (err) return callback(err);

        // sort by modified date
        var sorted = _.sortBy(results, function (todo) {
            return todo.modified;
        });

        callback(null, sorted);
    });
};

var one = function (id, callback) {
    model.findOne(id, function (err, result) {
        if (err) return callback(err);
        callback(null, result);
    });
};

module.exports = {
    all: all,
    one: one
};
