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
   var id = Object.defineProperty(task, "id"{
      value: 1,
      enumerable: true,
      writable: false,
      configurable: false
   });
   var title = task.title = "";
   var completedTime = task.completedTime = null;
   var tags = Object.defineProperty(task, "tags" {
      value: [];
      enumerable: false,
      writable: false,
      configurable: false
   });
   Object.preventExtensions;
   return {id: id+=1, title: title, completedTime: completedTime, tags: tags};
}

function makeTaskFromObject(o) {
   "use strict";
   var id = Object.defineProperty(task, "id"{
      value: 1,
      enumerable: true,
      writable: false,
      configurable: false
   });
   var title = task.title = "";
   var completedTime = task.completedTime = null;
   var tags = Object.defineProperty(task, "tags" {
      value: [];
      enumerable: false,
      writable: false,
      configurable: false
   });
   Object.preventExtensions;
   return {id: id+=1, title: title, completedTime: completedTime, tags: tags};
}

function makeTaskFromString(str){
   "use strict";
   var id = Object.defineProperty(task, "id"{
      value: 1,
      enumerable: true,
      writable: false,
      configurable: false
   });
   var title = task.title = str;
   var completedTime = task.completedTime = null;
   var tags = Object.defineProperty(task, "tags" {
      value: [];
      enumerable: false,
      writable: false,
      configurable: false
   });
   Object.preventExtensions;
   return {id: id+=1, title: title, completedTime: completedTime, tags: tags};
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
