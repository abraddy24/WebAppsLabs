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
   var task, val;
   val = 0;
   task = Object.create(proto);
   task.title = "";
   task.completedTime = null;
   Object.defineProperty(task, "id", {
      value: incVal(),
      enumerable: true,
      writable: false,
      configurable: false
   });
   Object.defineProperty(task, "tags", {
      value: incVal(),
      enumerable: false,
      writable: false,
      configurable: false
   });
   function incVal(){
      val += 1;
      return val;
   }
   Object.preventExtensions(task);
   return task;
}

function makeTaskFromObject(o) {
   "use strict";
   var task = Task.new();
   task.setTitle(o.title);
   task.addTag(o.tag);
   return task;
}

function makeTaskFromString(str){
   "use strict";
   return Task.fromObject(processString(str));
}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here
    setTitle: function setTitle(s){
      "use strict";
      s.trim();
      this.title = s;
      return this;
   },

    isCompleted: function isCompleted(){
      "use strict";
      return this.completedTime !== null;
   },

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
