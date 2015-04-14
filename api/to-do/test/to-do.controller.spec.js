'use strict';

var expect = require('expect.js');
var controller = require('../to-do.controller.js');

describe('todo.controller', function () {
    describe('all', function () {
        it('should return an array of todo objects', function (done) {
            controller.all(function (err, results) {
                if (err) return done(console.error(err));

                expect(results).to.be.an(Array);
                results.forEach(function (result) {
                    expect(result).to.have.property('id');
                    expect(result).to.have.property('title');
                    expect(result).to.have.property('description');
                    expect(result).to.have.property('created');
                    expect(result).to.have.property('modified');
                });

                done();
            });
        });
    });

    describe('one', function () {
        it('should return a single todo object given an id', function (done) {
            controller.one(1, function (err, result) {
                if (err) return done(console.error(err));

                expect(result).to.be.an(Object);

                expect(result).to.have.property('id');
                expect(result).to.have.property('title');
                expect(result).to.have.property('description');
                expect(result).to.have.property('created');
                expect(result).to.have.property('modified');
                done();
            });
        });
    });
});
