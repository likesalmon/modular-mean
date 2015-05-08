'use strict';

var expect = require('chai').expect;
var ToDoController = require('../ToDoController');
var tds = require('../ToDoService');

describe('ToDoController', function() {
    var scope,
        Controller,
        ToDoService;

    beforeEach(function () {
        scope = {};
        ToDoService = new tds();
        Controller = new ToDoController[ToDoController.length - 1](scope, ToDoService);
    });

    it('ToDoController should exist', function() {
        expect(!!Controller).to.equal(true);
        expect(scope.todos).to.be.an('array');
    });
});
