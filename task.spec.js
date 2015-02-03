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
	var task1, task2, task3, task4, task5, task6, s1, s2, arr, arr2;
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
	it('checks to see if tag added and exists', function(){
		task1.addTag("bill");
		expect(task1.hasTag("bill")).to.equal(true);
	});
	it('checks to see if tag is properly removed', function(){
		task1.addTag("bob");
		expect(task1.hasTag("bob")).to.equal(true);
		task1.removeTag("bob");
		expect(task1.hasTag("bob")).to.equal(false);
	});
	it("does not allow to add same key", function(){
		task3 = Task.new();
		task3.addTag("hello");
		expect(function() {task3.addTag("hello")}).to.throw(Error);
	});
	it("does not allow removal of nonexistant object", function(){
		task4 = Task.new();
		task4.addTag("Pokemon");
		task4.removeTag("Pokemon");
		expect(function() {task4.removeTag("Pokemon")}).to.throw(Error)
	});
	it("toggleTag changes the status of tags in a task", function() {
		task4.toggleTag("algorithm");
		expect(task4.hasTag("algorithm")).to.equal(true);
		task4.toggleTag("algorithm");
		expect(task4.hasTag("algorithm")).to.equal(false);
	});
	it("addTags can add multiple tags at the same time", function() {
		task5 = Task.new();
		arr = ["bob", "phill", "dave", "howard"];
		task5.addTags(arr);
		expect(task5.hasTag("bob")).to.equal(true);
		expect(task5.hasTag("phill")).to.equal(true);
		expect(task5.hasTag("dave")).to.equal(true);
		expect(task5.hasTag("howard")).to.equal(true);
	});
	it("toggleTags toggles multiple tags at the same time", function() {
		arr2 = ["web", "board", "guy", "verb"];
		task6 = Task.new();
		task6.toggleTags(arr2);
		console.log(task6.tags);
		expect(task6.hasTag("web")).to.equal(true);
		expect(task6.hasTag("board")).to.equal(true);
		expect(task6.hasTag("guy")).to.equal(true);
		expect(task6.hasTag("verb")).to.equal(true);
		task6.toggleTags(arr2);
		expect(task6.hasTag("web")).to.equal(false);
		expect(task6.hasTag("board")).to.equal(false);
		expect(task6.hasTag("guy")).to.equal(false);
		expect(task6.hasTag("verb")).to.equal(false);
	})
});
