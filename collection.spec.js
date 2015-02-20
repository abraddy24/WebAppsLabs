/*
 * collection.spec.js
 *
 * Test file for your collection class
 */
var expect, Task, TaskCollection;

expect = require("./chai.js").expect;

Task = require("./task.js");
TaskCollection = require("./collection.js");

// ADD YOUR TESTS HERE
function randomString(){
	"use strict";
	var text, possible, i;
    text = "";
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (i = 0; i < 5; i += 1){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function randomTasks(n){
	"use strict";
	var a, t, i, j;
	a = [];
	for (i = 0; i < n; i += 1){
		t = Task.new();
		t.setTitle(randomString());
		for (j = 0; j < t.title.length; j += 1){
			t.addTag(randomString());
		}
		a.push(t);
	}
	return a;
}

describe("Your makeNewCollection function", function(){
	var c1, c2, tsks;
	c1 = TaskCollection.new();
	tsks = randomTasks(5);
	c2 = TaskCollection.new(tsks);
	it("returns an object", function(){
		expect(c1).to.be.a("object");
	});
	it("returns an object with correct key", function(){
		expect(c1).to.have.ownProperty("values");
	});
	it("sucessfully adds tasks when provided them", function(){
		expect(c1.isEmpty()).to.equal(true);
		expect(c2.length()).to.equal(5);
	});
});

describe("Your length function", function(){
	var c, ts;
	ts = randomTasks(10);
	c = TaskCollection.new(ts);
	it("properly calculates length", function(){
		expect(c.length()).to.equal(10);
	});
});

describe("Your isEmpty function", function(){
	var co1, co2;
	t = randomTasks(6);
	co1 = TaskCollection.new(t);
	co2 = TaskCollection.new();
	it("determines that a collection is empty when it should", function(){
		expect(co1.isEmpty()).to.equal(false);
		expect(co2.isEmpty()).to.equal(true);
	});
});

describe("Your get function", function(){
	var coll, tasks;
	tasks = randomTasks(10);
	coll = TaskCollection.new(tasks);
	it('properly gets tasks when given a function', function(){
		var t = [
			Task.fromString("One #first #second"),
			Task.fromString("Two #first #second #third"),
			Task.fromString("Three #first"),
		];
		coll.add(t);
		expect(coll.get(function(task) { return task.hasTag("third") }).title).to.equal("Two");
	});
	it('properly gets tasks when given a number', function(){
		var id = tasks[7].id;
		expect(coll.get(id)).to.equal(tasks[7]);
		expect(coll.get(id*42)).to.equal(null);
	});
	it('properly gets tasks when given a string', function(){
		var str, title;
		title = tasks[7].title;
		str = "9*1This Will Not Be Generated@#45";
		expect(coll.get(title)).to.equal(tasks[7]);
		expect(coll.get(str)).to.equal(null);
	});
	it.skip('properly returns the task title if it is a regular expression', function() {
		var t = [
			Task.fromString("One #first #second #third"),
			Task.fromString("12345 #first #second"),
			Task.fromString("Three #first"),
		];
		coll.add(t);
		expect(coll.get(/\d/).title).to.equal("12345");
	});
});


describe("Your has function", function(){
    var coll, tasks;
    tasks = randomTasks(5);
    coll = TaskCollection.new(tasks);
    it("works when given a number", function(){
        var id = tasks[3].id;
        expect(coll.has(id)).to.equal(true);
        expect(coll.has(id*3)).to.equal(false);
    });
    it("works when given a string", function(){
        var str, title;
        title = tasks[2].title;
        str = "9*1This Will Not Be Generated@#45";
        expect(coll.has(title)).to.equal(true);
        expect(coll.has(str)).to.equal(false);
    });
});

describe("Your add, remove, and newTask functions", function(){
	it('correctly implements add, remove, and newTask',function(){
        var coll, coll2, tasks1, tasks2, id1;
        tasks1 = randomTasks(1);
        tasks2 = randomTasks(7);
        id1 = tasks2[5].id;
        coll = TaskCollection.new(tasks2);
        expect(coll.has(id1)).to.equal(true);
        coll.remove(id1);
        expect(coll.length()).to.equal(6);
        expect(coll.has(id1)).to.equal(false);

        coll2 = TaskCollection.new(tasks1);
        expect(coll.isEmpty()).to.equal(false);
        expect(coll2.length()).to.equal(1);
    });
})

describe('Your filter and forEach functions',function(){
    var coll, tasks;
    coll = TaskCollection.new();
    tasks = randomTasks(6);
    it('filters if given an array of numbers',function(){
        var coll2, id1;
        id1 = tasks[1].id;
        coll2 = coll.filter(id1);
        expect(coll2.isEmpty()).to.equal(true);
        expect(coll2.length()).to.equal(0);
        expect(coll2.get(id1)).to.equal(tasks[1]);
    });
    it('filters given a string',function(){
        var coll2, title1;
        title1 = tasks[3].title;
        coll2 = coll.filter(title1);
        expect(coll2.isEmpty()).to.equal(true);
        expect(coll2.length()).to.equal(0);
        expect(coll2.get(title1)).to.equal(tasks[3]);
    });

});
