try {
   var chai = require('./../chai.js');
   var expect = chai.expect;
   var methods = require('./mapCode.js');
   var binarySearch = methods.binarySearch;
   var countTags = methods.countTags;
   var extractHashTags = methods.extractHashTags;
} catch (e) {}

function randomString(len) {
   var arr = [], caseRange, i;
   if (len == null) { len = 5; }
   for (i = 0; i < len; i += 1) {
      caseRange = [65, 97][Math.floor(Math.random() * 2)];
      arr.push(Math.floor(Math.random() * 26) + caseRange);
   }
   return String.fromCharCode.apply(String, arr);
}
// DO NOT CHANGE ANYTHING ABOVE THIS LINE

// Add your tests below

describe('Your code for map', function(){
   it('defines a variable map', function(){
      expect(function(){makeMap;}).to.not.throw(Error);
   });
   it('actually defines a function makeMap', function(){
      expect(makeMap).to.be.a('function')
   });
});

describe('Your makeMap function',function(){
   var map = makeMap();
   it('returns an object', function(){
      expect(map).to.be.a('object');
   });
   it('returns an object with methods has, lookup, add, update, remove',function(){
      ['has', 'lookup', 'add', 'update', 'remove'].forEach(function(key){
         expect(map[key]).to.be.a('function');
      });
   });
});


describe('Map methods:', function(){
   var map;
   beforeEach(function(){
      map = makeMap();
   });
   it('has returns true where true', function(){
      map.add('a', 5);
      expect(map.has('a')).to.equal(true);
   });
   it('has returns false when necessary', function(){
      expect(map.has('a')).to.equal(false);
   });
   it('lookup function returns proper value when key is called', function(){
      map.add('e', 9);
      console.log(map.e);
      expect(map.lookup('e')).to.equal(9);
   });
   it('lookup function retruns false when key is not in map', function(){
      expect(function(){map.lookup('q');}).to.throw(Error);
   })
});