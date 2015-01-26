/*
 * task.js
 *
 * Contains implementation for a "task" "class"
 */

var Task, proto;

// Helper method. You should not need to change it.
// Use it in makeTaskFromString
function processString(s) {
   "use strict";
   var tags, title;

   tags = [];
   title = s.replace(/\s*#([a-zA-Z]+)/g, function(m, tag) {
      tags.push(tag);
      return "";
   });

   return { title: title, tags: tags };
}

/*
 *       Constructors
 */

function makeNewTask() {
   "use strict";
}

function makeTaskFromObject(o) {
   "use strict";
}

function makeTaskFromString(str){
   "use strict";
}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here

};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
Task = {
   new: makeNewTask,
   fromObject: makeTaskFromObject,
   fromString: makeTaskFromString
};

Object.defineProperty(Task, proto, {
   value: proto,
   writable: false
});

module.exports = Task;
