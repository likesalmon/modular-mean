'use strict';

var expect = require('chai').expect;
var Controller = require('../NavigationController');
var Service = require('../NavigationService');

describe('NavigationController', function() {
    var scope,
        mdSidenav,
        NavigationService,
        mdMedia,
        ctrl;

    beforeEach(function () {
        scope = {
            $watch: function () {}
        };
        NavigationService = new Service();

        mdSidenav = function (elId) {
            return {
                toggle: function () {
                    return elId;
                }
            };
        };

        mdMedia = function (size) {
            return size;
        };

        ctrl = new Controller[Controller.length - 1](scope, mdSidenav, mdMedia, NavigationService);
    });

    it('NavigationController should exist', function() {
        expect(!!ctrl).to.equal(true);
    });

    it('should get navItems from NavigationService', function () {
        expect(scope.nav.items).to.be.an('array');
    });
});
