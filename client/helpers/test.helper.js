'use strict';

// Load in our actual project
// require('MyApp');
//
// Dependencies
// require('angular-mocks');
var chai = require('chai');
var sinon = require('sinon');
var chaiAsPromised = require('chai-as-promised');
var sinonChai = require('sinon-chai');
chai.use(chaiAsPromised);
chai.use(sinonChai);



beforeEach(function() {
    // Create a new sandbox before each test
    this.sinon = sinon.sandbox.create();
});

afterEach(function() {
    // Cleanup the sandbox to remove all the stubs
    this.sinon.restore();
});

module.exports = {
    rootUrl: 'http://localhost:3000',
    expect: chai.expect
};
