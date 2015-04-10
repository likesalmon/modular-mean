'use strict';

var controller = require('./toDo.controller.js');

var all = function (req, res, next) {
    controller.all(function (err, results) {
        if (err) return next(err);
        res.json(results);
    });
};

var one = function (req, res, next) {
    controller.one(req.id, function (err, result) {
        if (err) return next(err);
        res.json(result);
    });
};

module.exports = {
    all: all,
    one: one
};
