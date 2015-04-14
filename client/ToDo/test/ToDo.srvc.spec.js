'use strict';

var expect = require('chai').expect;
var todoSrvc = require('../ToDo.srvc.js')();

describe('ToDo Service', function () {
    describe('all()', function () {
        it('Should return an array', function () {
            var todos = todoSrvc.all();
            expect(todos).to.be.an('array');
            expect(todos.length).to.equal(1);
        });
    });

    describe('one()', function () {
        var todo = todoSrvc.one(1);
        expect(todo).to.be.an('object');
        expect(todo).to.have.property('id', 1);
        expect(todo).to.have.property('title', 'Example Todo');
        expect(todo).to.have.property('description', 'This is an example.');
        expect(todo).to.have.property('created');
        expect(todo).to.have.property('modified');
        expect(todo.created).to.be.an.instanceof(Date);
        expect(todo.modified).to.be.an.instanceof(Date);
    });
});
