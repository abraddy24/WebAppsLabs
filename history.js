/*
 * history.js
 *
 * Contains implementation for a CmdHistory "class"
 */

var DLList, CmdHistory, proto;

DLList = require("./dllist");

/*
 *       Constructors
 */

function makeNewHistory() {
   var hist = Object.create(proto);
   hist.list = DLList.new();
   hist.current = null;
   return hist;
}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here
add: function add(cmd){
		if (this.current === null){
			this.list.unshift(cmd);
			this.current = this.list.first();
		}else {
			this.list.insertAt(cmd, this.current);
			this.current = this.current.next;
		}
		this.list.endAt(this.current);
		cmd.execute();
},
canRedo: function canRedo(){
		if (this.list.isEmpty()){
			return false;
		}
		return this.current.next.value !== null;
},
canUndo: function canUndo(){
		return !this.list.isEmpty();
},
redo: function redo(){
		if (this.canRedo()){
			this.current = this.current.next;
			this.current.value.execute();
		} else {
			throw new Error("Cannot Redo this");
		}
},
undo: function undo(){
		if (this.current === null){
			throw new Error("current does not exits");
		}
		this.current.value.unexecute();
		this.current = this.current.prev;
},
undoableIterator: function undoableIterator(){
	    return this.list.reverseIterateFrom(this.current);
},
redoableIterator: function redoableIterator(){
	   return this.list.iterateFrom(this.current.next);
}
};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
CmdHistory = {
   new: makeNewHistory
};

Object.defineProperty(CmdHistory, "prototype", {
   value: proto,
   writable: false
});

module.exports = CmdHistory;
