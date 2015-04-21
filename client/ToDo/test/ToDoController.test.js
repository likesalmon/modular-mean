'use strict';

var expect = require('chai').expect;
var ToDoController = require('../ToDoController');

describe('ToDoController', function() {
    var scope,
        ctrl;

    beforeEach(function () {
        scope = {};
        ctrl = new ToDoController[1](scope);
    });

    it('ToDoController should exist', function() {
        expect(!!ctrl).to.equal(true);
        expect(scope.todos).to.be.an('array');
    });
});
