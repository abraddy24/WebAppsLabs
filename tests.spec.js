try {
   var chai = require('./chai.js');
   var expect = chai.expect;
   var methods = require('./yourCode.js');
   var binarySearch = methods.binarySearch;
   var countTags = methods.countTags;
   var extractHashTags = methods.extractHashTags;
} catch (e) {}

// Do not change anything above this line

describe('Your code for stacks', function() {
   it('defines a variable makeStack', function() {
      expect(function() { makeStack; }).to.not.throw(Error);
   });

   it('actually defines a function makeStack', function() {
    expect(makeStack).to.be.a('function')});

   // Add more "it" sections below
});
describe('Your makeStack function', function() {
  var stack = makeStack();
  it('returns an object', function() {
    expect(stack).to.be.a('object');
  });
  it('returns an object with methods push, pop and isEmpty', function() {
    ['push', 'pop', 'isEmpty'].forEach(function(key) {
        expect(stack[key]).to.be.a('function');
    });
});
});