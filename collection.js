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

function taskSearch(tsk, arr){
    "use strict";
    var i, f;
    f = argFunction(tsk);
    for (i = arr.length - 1; i >= 0; i -= 1){
        if (f(arr[ i ])){
            break;
        }
    }
    return i === arr.length ? -1 : i;
}

 function singleTaskRemove(task, own){
    "use strict";
    if (!own.has(task)){
        own.values.splice(own.values.indexOf(own.get(task)), 1);
    }
 }

function tskPrint(t){
    "use strict";
    var s = t.title;
    if (t.isCompleted()){
        s = s + " " + t.completedTime;
    }
    if (t.hasTags()){
        t.tags.forEach(function (item, i){
        s = s + " #" + item;
        });
    }
    s = s + "\n";
    return s;
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
    get: function(arg) {
        "use strict";
        var i = taskSearch(arg, this.values);
        return i === -1 ? null : this.values[ i ];
    },
    has: function(arg) {
        "use strict";
        return !(taskSearch(arg, this.values) === -1);
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
        var obj, func, container;
        obj = {};
        container = Task.new();
        func = function(tsk){
            container.addTags(tsk.tags);
        };
        this.forEach(func);
        container.tags.forEach(function (tag, i){
            var arr = [];
            this.values.forEach(function (task, i2){
                if (task.hasTag(tag)){
                    arr.push(task);
                }
            });
            obj[ tag ] = TaskCollection.new(arr);
        }, this);
        return obj;
    },
    print: function print(){
        "use strict";
        var str = "";
        if (!this.isEmpty()){
            this.values.forEach(function (item, i){
                str = str + tskPrint(item);
            });
        }
        return str;
    },
    concat: function concat(coll){
        "use strict";
        coll.forEach(function (item, i){
            this.add(item.values);
        }, this);
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
