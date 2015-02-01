/*
 * task.spec.js
 *
 * Test file for your task class
 */
var expect, Task;
/*eslint-env node, mocha */
expect = require('./chai.js').expect;

Task = require('./task.js');


function randomStr()
{
	var text, possible;
    text = "";
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5 ;i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

// ADD YOUR TESTS HERE
describe('Your makeNewTask function', function() {
	var t;
	t = Task.new();
	it('returns an object', function() {
		expect(t).to.be.a('object');
	});
	it('returns an object with keys', function() {
		expect(t).to.have.ownProperty('title', 'completedTime', 'tags', 'id');
	});
});


describe('Your makeTaskFromObject function', function(){
	var obj, task, s, tags, tag1, tag2;
	tag1 = randomStr();
	tag2 = randomStr();
	s = randomStr();
	tags = [ tag1, tag2 ];
	obj = { 'title': s, 'tags': tags };
	task = Task.fromObject(obj);
	it('returns an object', function() {
		expect(task).to.be.a('object');
	});

	it('returns an object with keys', function() {
		expect(task).to.have.ownProperty('title', 'completedTime', 'tags', 'id');
	});

	it('returns object with correct title', function() {
		expect(task.title).to.equal(s);
	});

	it('returns obect with correct tags', function() {
		expect(task.tags).to.have.length(2);
		expect(task.tags).to.include(tag1);
		expect(task.tags).to.include(tag2);
	});
});

describe('Your makeTaskFromString function', function() {
	var s, task, tag1, tag2, tags, all;
	s = randomStr();
	tag1 = "bob";
	tag2 = "phillip";
	all = s + "#" + tag1 + "#" + tag2;
	tags = [ tag1, tag2 ];
	task = Task.fromString(all);


	it('returns object', function() {
		expect(task).to.be.a('object');
	});

	it('returns an object with keys', function() {
		expect(task).to.have.ownProperty('title', 'completedTime', 'tags', 'id');
	});

	it('returns object with correct title', function() {
		expect(task.title).to.equal(s);
	});

	it('returns obect with correct tags', function() {
		expect(task.tags).to.have.length(2);
		expect(task.tags).to.include(tag1);
		expect(task.tags).to.include(tag2);
	});
});

describe('Task methods:', function(){
	var task1, task2, task3, s1, s2;
	beforeEach(function(){
		s1 = randomStr();
		s2 = randomStr();
		task1 = Task.new();
	});
	it('assigns id value correctly', function(){
		task2 = Task.new();
		expect(task2.id).to.equal(task1.id + 1);
	});
	it('sets title correctly', function(){
		task1.setTitle(s1);
		expect(task1.title).to.equal(s1);
	});
	it('checks completeness', function() {
		expect(task1.isCompleted(task1.completedTime)).to.equal(false);
		task1.toggleCompleted();
		expect(task1.isCompleted(task1.completedTime)).to.equal(true);
	});
});
