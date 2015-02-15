/*
 * collection.js
 *
 * Contains implementation for a "TaskCollection" "class"
 */

var TaskCollection, Task, proto;

Task = require("./task");

/*
 *       Constructors
 */

function makeNewCollection(arr){
    "use strict";
    var c = Object.create(proto);

    Object.defineProperty(col, "values", {
        writable: false,
        value: []
    });
	if (Object.prototype.toString.call(arr) === "[object Array]"){
		c.add(arr);
	}
    Object.preventExtensions(col);
    return c;
}
}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here
	length: function() {
		"use strict";
		return this.values.length;
	},
	isEmpty: function() {
		"use strict";
		return this.values.length === 0;
	},
	get: function(arg) {
		"use strict";
		var i = searchInTasks(arg, this.values);
		return i === -1 ? null : this.values[ i ];
	},
	has: function(arg) {
		"use strict";
		return !(searchInTasks(arg, this.values) === -1);
	},
	add: function(t) {
		"use strict";
		var i;
		if (Array.isArray(t)) {
			for (i = t.length - 1; i >= 0; i -= 1) {
				this.values.push(t[ i ]);
			}
		} else {
			this.values.push(t);
		}

		return this;
	},
};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
TaskCollection = {
   new: makeNewCollection
};

Object.defineProperty(TaskCollection, "prototype", {
   value: proto,
   writable: false
});

module.exports = TaskCollection;
