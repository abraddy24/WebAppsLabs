/*
 * history.spec.js
 *
 * Test file for your history class
 */
var expect, DLList, CmdHistory;

expect = require('./chai.js').expect;

DLList = require('./dllist.js');
CmdHistory = require('./history.js');

var LogEntries = [];
var Log = {
   add: function(s) { LogEntries.push(s); return this; },
   get: function() { return LogEntries; },
   clear: function() { LogEntries = []; return this; }
};
var id = 0;
function mockExecute() { Log.add(this.toString + " executed"); }
function mockUnexecute() { Log.add(this.toString + " unexecuted"); }
function mockCommand() {
   id += 1;
   return {
      execute: mockExecute,
      unexecute: mockUnexecute,
      toString: "command " + id
   };
}

// ADD YOUR TESTS HERE
describe("Your add, canUndo, and undo functions", function(){
	beforeEach(function() {
    h = CmdHistory.new();
	cmd = mockCommand();
	cmd1 = mockCommand();
  });

	it("adds a new command to history", function(){
		h.add(cmd);
		expect(h.current.value).to.equal(cmd);
		h.add(cmd1);
		expect(h.current.value).to.equal(cmd1);
	});
	it("canUndo returns true if an item can be undone", function(){
		expect(h.canUndo()).to.equal(false);
		h.add(cmd);
		expect(h.canUndo()).to.equal(true);
	});
	it("undo takes back current command and moves back one", function(){
		expect(function() { h.undo(); }).to.throw(Error);
		h.add(cmd);
		h.undo();
		expect(h.current.value).to.equal(null);
	});
});
describe("Your canRedo, redo, undoableIterator, and redoableIterator functions", function(){
	beforeEach(function() {
    h = CmdHistory.new();
	cmd = mockCommand();
	cmd1 = mockCommand();
	});
	it("canRedo returns true if an item after current can be redone", function(){
		expect(h.canRedo()).to.equal(false);
		h.add(cmd);
		expect(h.canRedo()).to.equal(false);
		h.undo();
		expect(h.canRedo()).to.equal(true);
	});
	it("redo mvoes current to the next item and executes it throws error if next is not there", function(){
		expect(function() { h.redo(); }).to.throw(Error);
		h.add(cmd);
		h.undo();
		h.redo();
		expect(h.current.value).to.equal(cmd);
	});
	it("undoableIterator goes to all undoable commands from current and goes backwards", function(){
		var itr;
		h.add(cmd);
		h.add(cmd1);
		itr = h.undoableIterator();
		expect(itr.next()).to.equal(cmd1);
		expect(itr.next()).to.equal(cmd);
	});
	it("redoableIterator visits all redoable commands and moves forwards", function(){
		var itr;
		h.add(cmd);
		h.add(cmd1);
		h.undo();
		h.undo();
		itr = h.redoableIterator();
		expect(itr.next()).to.equal(cmd);
		expect(itr.next()).to.equal(cmd1);
	});
});