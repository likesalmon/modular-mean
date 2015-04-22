'use strict';

var expect = require('chai').expect;
var ToDoController = require('../ToDoController');
var tds = require('../ToDoService');

describe('ToDoController', function() {
    var scope,
        ctrl,
        ToDoService;

    beforeEach(function () {
        scope = {};
        ToDoService = new tds();
        ctrl = new ToDoController[ToDoController.length - 1](scope, ToDoService);
    });

    it('ToDoController should exist', function() {
        expect(!!ctrl).to.equal(true);
        expect(scope.todos).to.be.an('array');
    });
});
