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
