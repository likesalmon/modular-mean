'use strict';

var expect = require('chai').expect;
var DashboardController = require('../DashboardController');

describe('DashboardController', function () {
    var scope,
        Controller;

    beforeEach(function () {
        scope = {};
        Controller = new DashboardController[DashboardController.length - 1](scope);
    });

    it('should exist', function () {
        expect(!!Controller).to.be.true;
    });
});
