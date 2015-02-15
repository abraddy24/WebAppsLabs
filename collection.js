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
	},new: function() {
		"use strict";
		var t = Task.new();
		this.add(t);
		return t;
	},
	remove: function(id) {
		"use strict";
		var i;
		if (Array.isArray(id)) {
			for (i = id.length - 1; i >= 0; i -= 1) {
				if (searchInTasks(id[ i ], this.values) !== -1) {
					this.values.splice(i, 1);
				}
			}
		} else {
			i = searchInTasks(id, this.values);
			this.values.splice(i, 1);
		}
		return this;
	},
	filter: function(id) {
		"use strict";
		var i, newCol = TaskCollection.new();
		if (Array.isArray(id)) {
			for (i = id.length - 1; i >= 0; i -= 1) {
				if (searchInTasks(id[ i ], this.values) !== -1) {
					newCol.add(this.values[ i ]);
					continue;
				}
			}
		}
		return newCol;
	},
	forEach: function(f) {
		"use strict";
		var i;
		for (i = f.length - 1; i >= 0; i -= 1) {
			f(this.values[ i ]);
		}
		return this;
   }
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
