/*
 * dllist.spec.js
 *
 * Test file for your history class
 */
var expect, DLList, CmdHistory;

expect = require('./chai.js').expect;

DLList = require('./dllist.js');
CmdHistory = require('./history.js');

// ADD YOUR TESTS HERE
describe("Your isEmpty, length, and first functoins", function(){
  "use strict";

  var list, item, item2, value;
  value = 0;
  beforeEach(function() {
  list = DLList.new();
  value += 1;
  });

  it("isEmpty is true when empty", function(){
      expect(list.isEmpty()).to.equal(true);
  });
  it("isEmpty is false when not empty", function(){
      list.push(0);
      expect(list.isEmpty()).to.equal(false);
  });
  it("length returns correct number", function(){
      expect(list.length()).to.equal(0);
      list.push(0);
      expect(list.length()).to.equal(1);
      list.push(1);
      expect(list.length()).to.equal(2);
  });
  it("first return the first item", function(){
      list.push(0);
      list.push(1);
      expect(list.first().value).to.equal(0);
  });
});
describe("Your last, insertAt, unshift, and push functions", function(){
  var list, item, item2, value;
  value = 0;
  beforeEach(function() {
  list = DLList.new();
  value += 1;
  });
  it("last returns the last item", function(){
      list.push(0);
      list.push(1);
      expect(list.last().value).to.equal(1);
      list.push(8);
      list.push(12);
      list.push(5);
      expect(list.last().value).to.equal(5);
  });
  it("insertAt correctly inserts items", function(){
      list.push(0);
      list.insertAt(3, list.first());
      expect(list.last().value).to.equal(3);
      list.push(6);
      list.insertAt(9, list.last());
      expect(list.last().value).to.equal(9);
  });
  it("unshift adds a new element at the beginning of the list", function(){
      list.push(2);
      list.push(1);
      list.unshift(0);
      expect(list.first().value).to.equal(0);
      list.push(8);
      list.push(6);
      list.unshift(9);
      list.unshift(10);
      expect(list.first().value).to.equal(10);
  });
});
describe("Your endAt, remove, pop, and shift function", function(){
  var list, item, item2, value;
  value = 0;
  beforeEach(function() {
  list = DLList.new();
  value += 1;
  });
  it("endAt returns the correct list", function(){
      list.push(1);
      list.push(2);
      expect(list.endAt(list.sentinel.next).length()).to.equal(1);
      list.push(2);
      list.push(3);
      list.push(4);
      list.push(5);
      expect(list.endAt(list.sentinel.next.next.next).length()).to.equal(3);
      list.push(7);
      list.push(9);
      list.push(10);
      list.push(15);
      list.push(20);
      expect(list.endAt(list.sentinel.next.next.next.next.next).length()).to.equal(5);
  });
  it("remove removes an item", function(){
      list.push(1);
      list.remove(list.sentinel.next);
      expect(list.length()).to.equal(0);
      list.push(5);
      list.push(6);
      list.remove(list.sentinel.next);
      expect(list.sentinel.next.value).to.equal(6);
      expect(list.sentinel.prev.value).to.equal(6);
  });
  it("pop removes the last item", function(){
      list.push(2);
      list.push(8);
      expect(list.pop()).to.equal(8);
  });
  it("pop throws error if empty list", function(){
    expect(function() { list.pop(); }).to.throw(Error);
  });
  it("shift removes first item", function(){
      list.push(8);
      list.push(9);
      expect(list.shift()).to.equal(8);
  });
  it("shift throws error if empty", function(){
    expect(function() { list.shift(); }).to.throw(Error);
  })
});
describe("Your isFist, isLast, iterator, and for each fucntions", function(){
  var list, item, item2, value;
  value = 0;
  beforeEach(function() {
  list = DLList.new();
  value += 1;
  });
  it("isFirst is true when argument is the first item", function(){
      list.push(7);
      list.push(9);
      expect(list.isFirst(list.sentinel.next)).to.equal(true);
      expect(list.isFirst(list.sentinel.prev)).to.equal(false);
      list.unshift(8);
      expect(list.isFirst(list.sentinel.prev)).to.equal(false);
      expect(list.isFirst(list.sentinel.next)).to.equal(true);
  });
  it("isLast is true when argument is the last item", function(){
      list.push(8);
      list.push(1);
      expect(list.isLast(list.sentinel.next)).to.equal(false);
      expect(list.isLast(list.sentinel.prev)).to.equal(true);
  });
  it("iterator returns an iterator for the dllist", function(){
      var itr = list.iterator();
      expect(itr.hasNext()).to.equal(false);
      list.push(1);
      list.push(2);
      itr = list.iterator();
      expect(itr.hasNext()).to.equal(true);
      expect(itr.next()).to.equal(1);
      expect(itr.next()).to.equal(2);
      expect(itr.hasNext()).to.equal(false);
  });
  it("forEach applies a function to each value in the list", function(){
      var ehh = function(v){
        console.log(v);
      };
      list.push(15);
      list.push(16);
      list.forEach(ehh);
  });
});
describe("Your toArray, itrateFrom, and reverseIterateFrom functions", function(){
  var list, item, item2, value;
  value = 0;
  beforeEach(function() {
  list = DLList.new();
  value += 1;
  });
  it("toArray returns an array of the list's values", function(){
      list.push(5);
      list.push(9);
      list.push(5);
      list.unshift(7);
      expect(list.toArray()[ 0 ]).to.equal(7);
      expect(list.toArray()[ 1 ]).to.equal(5);
  });
  it("iterateFrom returns an iterator starting from a specific item", function(){
      var itr;
      list.push(18);
      list.push(14);
      list.push(16);
      itr = list.iterateFrom(list.first());
      expect(itr.next()).to.equal(18);
      expect(itr.next()).to.equal(14);
      expect(itr.next()).to.equal(16);
  });
  it("reverseIterateFrom  returns an iterator that starts at the end", function(){
      var itr;
      list.push(8);
      list.push(9);
      list.push(11);
      list.push(16);
      itr = list.reverseIterateFrom(list.last());
      expect(itr.next()).to.equal(16);
      expect(itr.next()).to.equal(11);
      expect(itr.next()).to.equal(9);
      expect(itr.next()).to.equal(8);
  });
});