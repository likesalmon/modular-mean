'use strict';

var expect = require('chai').expect;
var Service = require('../NavigationService');

describe('NavigationService', function() {
    var NavigationService;

    beforeEach(function () {
        NavigationService = new Service();
    });

    it('NavigationService should exist', function() {
        expect(!!NavigationService).to.equal(true);
    });

    it('should get all navItems', function () {
        var navItems = NavigationService.get();
        expect(navItems).to.be.an('array');

        navItems.forEach(function (item) {
            expect(item).to.have.property('title');
            expect(item.title).to.be.a('string');
            expect(item).to.have.property('state');
            expect(item.state).to.be.a('string');
        });
    });
});
