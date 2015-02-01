/*
 * task.spec.js
 *
 * Test file for your task class
 */
var expect, Task;

expect = require('./chai.js').expect;

Task = require('./task.js');

// ADD YOUR TESTS HERE
describe('Your makeNewTask function', function() {
	var t;
	t = Task.new();
	it('returns an object', function() {
		expect(t).to.be.a('object');
	});
	it('returns an object with keys', function() {
		expect(t).to.have.ownProperty('title','completedTime', 'tags', 'id');
	});
});


