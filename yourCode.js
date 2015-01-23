/*
 * Name 1: YourNameHere
 * Name 2: YourNameHere
 */
// All your code will go here.
function makeStack() {
    var values = [];
    var stack = {
        push: function push(el) {
            values.push(el);
            return stack;
        },
        pop: function pop() {
            if (stack.isEmpty()) {
                throw new Error("Attempt to pop from empty stack");
            } else {
                return values.pop();
            }
        },
        isEmpty: function isEmpty() {
            return values.length === 0;
        }
    };
    return stack;
}

// Do NOT change anything below this line.
/*
 * To allow node.js to run our tests. DO NOT CHANGE!
 */
try {
   module.exports = {
      binarySearch: binarySearch,
      countTags: countTags,
      extractHashTags: extractHashTags
   };
} catch (e) {}
