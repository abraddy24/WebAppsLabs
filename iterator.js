// Module for creating iterators
//
// An iterator is meant to provide us a way to traverse
// the elements of a "collection", without needing to know
// details about the collection.
//
// Iterators must have two methods:
// - next           <--- returns the "next" element.
//                       behavior undefined if no next element.
// - hasNext        <--- returns whether there is a next element.
//
// We can turn collections into "iterators" by providing this iterator method
// Once we have a such a method, we can provide for free a number of
// other methods:
// - forEach     <--- execute function on each element
// - filter      <--- returns "iterator" with those elements that
//                    pass predicate
// - map         <--- returns an iterator of transformed values
// - find        <--- looks for element that passes a predicate
// - any         <--- returns true if any of the elements pass
// - every       <--- returns true if all elements pass
// - toArray     <--- returns an array of values
// - takeUntil   <--- Keep all elements till predicate fails
// - take        <--- Keep a number of elements
// - dropWhile   <--- Skip all elements till predicate fails
// - drop        <--- Skip a number of elements
// - concat      <--- Creates a new iterator from concatenating iterators
// - repeat      <--- Repeats an iterator continuously
// - partition   <--- Partition in two iterators based on predicate
// - map2        <--- Combined with another iterator and a function of
//                    two arguments, returns an iterator
//
// We also want to have methods that convert from standard objects to
// iterators, that create some primitive iterators etc. These would be
// "class methods" if you like:
//
// - fromArray   <--- Iterates over array's values
// - sequence    <--- Creates an iterator from a value increasing
//                    by a step
// - constant    <--- Constant iterator, returning a single value forever

var Iterator = (function() {

    var Iterator, proto;

    Iterator = {};
    proto = {};
    Iterator.prototype = proto;

    // Basic constructor
    Iterator.new = function newIterator(next, hasNext) {
        var o = Object.create(proto);
        o.next = next;
        o.hasNext = hasNext;
        return o;
    };

    // Class methods
    Iterator.fromArray = function(arr) {
      var i = -1;
      return Iterator.new(
         function next() { i += 1; return arr[i]; },
         function hasNext() { return i + 1 < arr.length; }
      );
    };

    Iterator.sequence = function(from, to, step) {
        if (arguments.length < 3) { step = 1; }
        if (arguments.length < 2) { to = Infinity; }
        if (arguments.length < 1) { from = 1; }
        from -= step;
        return Iterator.new(
            function next() { return from; },
            function hasNext() {
                from += step;
                return from <= to;
            }
        );
    };

    Iterator.constant = function(v) {
        return Iterator.new(
            function next() { return v; },
            function hasNext() { return true; }
        );
    };

    Iterator.fromFunction = function(f) {
        return Iterator.new(
            function next() { return f(); },
            function hasNext() { return true; }
        );
    };

    // Prototype methods

    proto.forEach = function(f) {
        while (this.hasNext()) { f(this.next()); }
        return this;
    };

    proto.reduce = function(f, init) {
        while (this.hasNext()) { init = f(init, this.next()); }
        return init;
    };

    proto.map = function(f) {
        var that = this;
        return Iterator.new(
            function next() { return f(that.next()); },
            function hasNext() { return that.hasNext(); }
        );
    };

    proto.filter = function(pred) {
        var that = this;
        var nextValue;
        return Iterator.new(
            function next() { return nextValue; },
            function hasNext() {
                while (that.hasNext()) {
                    nextValue = that.next();
                    if (pred(nextValue)) { return true; }
                }
                return false;
            }
        );
    };

    proto.toArray = function() {
        var arr = [];
        while (this.hasNext()) { arr.push(this.next()); }
        return arr;
    };

    proto.find = function(pred) {
        var el;
        while (this.hasNext()) {
            el = this.next();
            if (pred(el)) { return el; }
        }
        throw new Error("Element not found");
    };

    proto.any = function(pred) {
        while (this.hasNext()) {
            if (pred(this.next)) { return true; }
        }
        return false;
    };

    proto.every = function(pred) {
        while (this.hasNext()) {
            if (!pred(this.next)) { return false; }
        }
        return true;
    };

    proto.takeUntil = function(pred) {
        var nextValue, done = false, that = this;
        return Iterator.new(
            function next() { return nextValue; },
            function hasNext() {
                if (!that.hasNext() && !done) { return false; }
                nextValue = that.next();
                if (pred(nextValue)) { done = true; }
                return !done;
            }
        );
    };

    proto.take = function(n) {
        var that = this;
        return Iterator.new(
            function next() { return that.next(); },
            function hasNext() {
                if (n <= 0 || !that.hasNext()) { return false; }
                n -= 1;
                return true;
            }
        );
    };

    proto.dropWhile = function(pred) {
        var that = this, allClear = false, nextValue;
        return Iterator.new(
            function next() { return nextValue; },
            function hasNext() {
                do {
                    if (!that.hasNext()) { return false; }
                    nextValue = that.next();
                } while (!allClear && pred(nextValue));
                allClear = true;
                return true;
            }
        );
    };

    proto.drop = function(n) {
        var that = this;
        return Iterator.new(
            function next() { return that.next(); },
            function hasNext() {
                while (n > 0 && that.hasNext()) {
                    n -= 1;
                    that.next();
                }
                return that.hasNext();
            }
        );
    };

    proto.concat = function(others) {
        var iterators = Array.prototype.slice.call(arguments),
            current;
        iterators.unshift(this);
        iterators = Iterator.fromArray(iterators);
        iterators.hasNext();
        current = iterators.next();

        return Iterator.new(
            function next() { return current.next() },
            function hasNext() {
                if (!current.hasNext()) {
                    if (!iterators.hasNext()) {
                        return false;
                    }
                    current = iterators.next();
                }
                return current.hasNext();
            }
        );
    };
    // TODO: Implement alternate
    proto.alternate = function(others) {

    };

    proto.repeat = function() {
        var arr = [], that = this, nextValue, filled = false;
        return Iterator.new(
            function next() { return nextValue; },
            function hasNext() {
                if (!that.hasNext()) {
                    if (arr.length === 0) { return false; }
                    filled = true;
                    that = Iterator.fromArray(arr);
                }
                nextValue = that.next();
                if (!filled) { arr.push(nextValue); }
                return true;
            }
        );
    };

    proto.map2 = function(other, f) {
        var that = this;
        return Iterator.new(
            function next() { return f(that.next(), other.next()); },
            function hasNext() { return that.hasNext() && other.hasNext(); }
        );
    };

    proto.cummulative = function(f, init) {
        var that = this;
        return Iterator.new(
            function next() {
                init = f(init, that.next());
                return init;
            },
            function hasNext() { return that.hasNext(); }
        );
    };

    proto.partition = function(pred) {
        var trues = [], falses = [], that = this;
        function processNext() {
            var v = that.next();
            (pred(v) ? trues : falses).push(v);
        }
        function fromArray(arr) {
            return Iterator.new(
                function next() { return arr.shift(); },
                function hasNext() {
                    while (arr.length === 0 &&
                           that.hasNext()) {
                        processNext();
                    }
                    return arr.length > 0;
                }
            );
        }
        return {
            "true": fromArray(trues),
            "false": fromArray(falses)
        };
    };

    proto.forceContract = function() {
        var hasNextSuccessful = false,
            oldNext = this.next,
            oldHasNext = this.hasNext;
        this.next = function() {
            if (hasNextSuccessful) {
                hasNextSuccessful = false;
                return oldNext.call(this);
            }
            throw new Error("Should only call 'next' after a successful 'hasNext'");
        };
        this.hasNext = function() {
            if (hasNextSuccessful) {
               throw new Error("Should not follow up a successful 'hasNext' with another 'hasNext'");
            }
            hasNextSuccessful = oldHasNext.call(this);
            return hasNextSuccessful;
        };
        return this;
    };

    return Iterator;
}());

try { module.exports = Iterator; } catch (err) {}


