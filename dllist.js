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
   		return false;
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
   	insertAt: function insertAt(val, node){
   		var tmp = {value: val, next: null, prev: null};
   		tmp.next = node.next;
   		tmp.prev = node;
   		node.next.prev = tmp;
   		node.next = tmp;
   		return tmp;
   	},
   	unshift: function unshift(val){
   		this.insertAt(val, this.sentinel);
   		return val;
   	},
   	push: functoin push(val){
   		this.insertAt(val, this.sentinel.prev);
   		return val;
   	},
   	endAt: function endAt(item){
   		var tmp = this.sentinel;
   		if(tmp === tmp){
   			tmp.next = this.sentinel;
   			this.sentinel.prev = tmp;
   		}
   		while(tmp !== item){
   			tmp = tmp.next;
   		}
   		retrun this;
   	},
   	remove: function remove(item){
   		var tmp = this.first();
   		if(tmp.next === item){
   			tmp.next = item.next;
   			item.next.prev = tmp;
   		}
   		while(tmp.next !== item){
   			tmp = tmp.next;
   		}
   		return item.value;
   	},
   	pop: function pop(){
   		return this.reomve(this.last);
   	},
   	shift: function shift(){
   		return this.remove(this.first());
   	},
   	isFirst: function isFirst(item){
   		if(this.first() === item){
   			return true;
   		}
   		return false;
   	},
   	isLast: function isLast(item){
   		if(this.last() === item){
   			return true;
   		}
   		return false;
   	},
   	iterator: function iterator(){
   		var itr, that;
   		itr = this.sentinel;
   		that = this;
   		return Iterator.new(
   			function next(){
   				itr = itr.next;
   				return itr.value;
   			},
   			function hasNext(){
   				retrun itr.next !=== that.sentinel;
   			});
   	},
   	forEach: function forEach(f){
   		return this.iterator().forEach(f);
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
