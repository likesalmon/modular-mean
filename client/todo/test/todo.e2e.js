'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

describe('todo', function() {
    it('should have a binding to foo', function() {
        browser.get('http://127.0.0.1:3000');
        var foo = element(by.binding('foo'));
        expect(foo.getText()).to.eventually.equal('bar');
    });
});
