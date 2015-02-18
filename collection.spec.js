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