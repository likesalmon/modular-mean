'use strict';

var expect = require('expect.js');
var controller = require('../todo.controller.js');

describe('todo.controller', function () {
    describe('all', function () {
        it('should return an array of todo objects', function (done) {
            controller.all(function (err, results) {
                if (err) return done(console.error(err));

                expect(results).to.be.an(Array);
                forEach(results, function (result) {
                    expect(result).to.have.property('id');
                    expect(result).to.have.property('title');
                    expect(result).to.have.property('description');
                    expect(result).to.have.property('created');
                    expect(result).to.have.property('modified');
                });
            });
        });
    });
});
