/*
 * dllist.js
 *
 * Contains implementation for a double-linked list "class"
 */

var Iterator, DLList, proto;

Iterator = require("./iterator");

/*
 *       Constructors
 */

function makeNewList() {
   var lst, sentinel;

   lst = Object.create(proto);
   sentinel = { value: null};
   sentinel.next = sentinel;
   sentinel.prev = sentinel;
   lst.sentinel = sentinel;
   return lst;
}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here
   isEmpty: function isEmpty(){
   		if(this.sentinel.next === this.sentinel && this.sentinel.prev === this.sentinel && this.sentinel.value === null){
   			return true;
   		}
   	},
   	length: function length(){
   		var len; temp;
   		len = 0;
   		temp = this.sentinel;
   		while(temp.next !=== this.sentinel){
   			len += 1;
   			temp = temp.next;
   		}
   		return len;
   	},
   	first: function first(){
   		if(this.isEmpty()){
   			throw "Cannot check on empty list";
   		}
   		return this.sentinel.next;
   	},
   	last: function last(){
   		if(this.isEmpty()){
   			throw "Cannot check on empty list";
   		}
   		return this.sentinel.prev;
   	},
   	
   }

};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
DLList = {
   new: makeNewList
};

Object.defineProperty(DLList, "prototype", {
   value: proto,
   writable: false
});

module.exports = DLList;
