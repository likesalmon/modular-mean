'use strict';

var expect = require('chai').expect;
var NavigationController = require('../NavigationController');
var NavigationService = require('../NavigationService');

describe('NavigationController', function() {
    var scope,
        mdSidenav,
        Service,
        mdMedia,
        Controller;

    beforeEach(function () {
        scope = {
            $watch: function () {}
        };
        Service = new NavigationService();

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

        Controller = new NavigationController[NavigationController.length - 1](scope, mdSidenav, mdMedia, Service);
    });

    it('NavigationController should exist', function() {
        expect(!!Controller).to.equal(true);
    });

    it('should get navItems from NavigationService', function () {
        expect(scope.nav.items).to.be.an('array');
    });
});
