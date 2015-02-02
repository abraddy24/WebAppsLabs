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
   var tags, title, c1;
   

   tags = [];
   title = s.replace(/\s*#([a-zA-Z]+)/g, function(m, tag) {
      tags.push(tag);
      return "";
   });

   return { title: title, tags: tags };
}

function makeCounter() {
      var c = 0;
      return function count() {
         c += 1;
         return c;
      }
   }
   c1 = makeCounter();

/*
 *       Constructors
 */

function makeNewTask() {
   "use strict";
   var task, val;
   val = c1();
   task = Object.create(proto);
   task.title = "";
   task.completedTime = null;
   Object.defineProperty(task, "id", {
      value: val,
      enumerable: true,
      writable: false,
      configurable: false
   });
   Object.defineProperty(task, "tags", {
      value: [],
      enumerable: false,
      writable: false,
      configurable: false
   });
   Object.preventExtensions(task);
   return task;
}

function makeTaskFromObject(o) {
   "use strict";
   var task = Task.new();
   task.setTitle(o.title);
   task.addTags(o.tags);
   return task;
}

function makeTaskFromString(str){
   "use strict";
   var o;
   
   o = makeTaskFromObject(processString(str));
   console.log(o);
   return o;
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

   toggleCompleted: function toggleCompleted(){
      "use strict";
      if (this.completedTime === null){
         this.completedTime = new Date();
      } else {
         this.completedTime = null;
      }
      return this;
   },

   hasTag: function hasTag(s){
      "use strict";
      var bool;
      bool = false;
      this.tags.forEach(function(tag, i){
         if (tag == s){
            bool = true;
         }
      }, this);
      return bool;
   },

   addTag: function addTag(s){
      "use strict";
      if (this.hasTag(s) === false){
         this.tags.push(s);
      }else{
         throw new Error("tag already exists");
      }
      return this;
   },

   removeTag: function removeTag(s){
      "use strict";
      if (this.hasTag(s) === true){
         this.tags.splice(this.tags.indexOf(s), 1);
      }else{
         throw new Error("tag does not exist");
      }
   },

   toggleTag: function toggleTag(s){
      "use strict";
      if (this.hasTag(s) === true){
         this.removeTag(s);
      }else {
         this.tags.push(s);
      }
      return this;
   },

   addTags: function addTags(a){
      "use strict";
      a.forEach(function(tag, i){
         this.addTag(tag);
      }, this);
   },

   toggleTags: function toggleTags(a){
      "use strict";
      a.forEach(function(tag, i){
         this.toggleTag(tag);
      }, this);
   },
   clone: function clone(){
      "use strict";
      var c = Task.new();
      c.title = this.title;
      c.completedTime = this.completedTime;
      c.tags = this.tags;
      return c;
   }
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
