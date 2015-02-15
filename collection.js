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

    Object.defineProperty(c, "values", {
        writable: false,
        value: []
    });
    if (Object.prototype.toString.call(arr) === "[object Array]"){
        c.add(arr);
    }
    Object.preventExtensions(c);
    return c;
}


/*
 *       Prototype / Instance methods
 */

function argFunction(a){
    "use strict";
    if (typeof a === "function") {
        return a;
    }else if (typeof a === "number") {
        return function(task){
            return task.id === a;
        };
    }else if (typeof a === "string") {
        return function(task){
            return task.title === a;
        };
    }
 }

 function getIndex(arg, own){
    "use strict";
    var i;
    arg = argFunction(arg);
    for (i = 0; i < own.lenght; i += 1){
        if (arg(own.valuses [ i ])){
            return i;
        }
    }
    return -1;
 }

 function singleTaskAdd(task, own){
    "use strict";
    if (!own.has(task)){
        own.values.push(task);
    }
 }
 function singleTaskRemove(task, own){
    "use strict";
    if (!own.has(task)){
        own.values.splice(own.values.indexOf(own.get(task)), 1);
    }
 }

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
    get: function get(arg){
        "use strict";
        var x = getIndex(arg, this);
        if (x === -1){
            return null;
        }
        return this.values[ x ];
    },
    has: function has(arg){
        "use strict";
        if (getIndex(arg, this) === -1){
            return false;
        }
        return true;
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
    new: function() {
        "use strict";
        var t = Task.new();
        this.add(t);
        return t;
    },
    remove: function remove(arg){
        "use strict";
        arg.forEach(function (item, i){
            singleTaskRemove(item, this);
        }, this);
        return this;
   },
    filter: function filter(arg){
        "use strict";
        var tsk = Task.new();
        arg.forEach(function (item, i){
            tsk.add(this.get(item));
        }, this);
        return tsk;
   },
    forEach: function(f) {
        "use strict";
        var i;
        for (i = f.length - 1; i >= 0; i -= 1) {
            f(this.values[ i ]);
        }
        return this;
    },
    groupByTag: function groupByTag(){
        "use strict";
    },
    print: function print(){
        "use strict";
    },
    concat: function concat(coll){
        "use strict";
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
