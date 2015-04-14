'use strict';

var expect = require('expect.js');
var todo = require('../to-do.js');

describe('todo', function () {
    describe('all', function () {
        it('should return an array of todo objects sorted by modified date', function (done) {
            var req = {};
            var res = {
                json: function (results) {
                    expect(results).to.be.an(Array);
                    results.forEach(function (result) {
                        expect(result).to.have.property('id');
                        expect(result).to.have.property('title');
                        expect(result).to.have.property('description');
                        expect(result).to.have.property('created');
                        expect(result).to.have.property('modified');
                    });
                    done();
                },
            };
            var next = function (err) {
                return done(console.err(err));
            };

            todo.all(req, res, next);
        });
    });

    describe('one', function () {
        it('should return a single todo object', function (done) {
            var req = {
                id: 1
            };
            var res = {
                json: function (result) {
                    expect(result).to.be.an(Object);
                    expect(result).to.have.property('id');
                    expect(result).to.have.property('title');
                    expect(result).to.have.property('description');
                    expect(result).to.have.property('created');
                    expect(result).to.have.property('modified');
                    done();
                },
            };
            var next = function (err) {
                return done(console.err(err));
            };

            todo.one(req, res, next);
        });
    });
});
