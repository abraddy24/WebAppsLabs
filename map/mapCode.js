/*
 * Name 1: YourNameHere
 * Name 2: YourNameHere
 */

// Do not change the name of this function
var makeMap = function() {
// All your code will go inside this function
   // This object should contain the methods you want to expose:
   var o = {
      has:  function(key){
         if(key in storedPairs){
            return true;
         }
         return false;
      },

      lookup: function(key){
         if(o.has(key)===false){
            throw new Error('Key does not exist');
         }
         return storedPairs[key];
      },

      add: function(key,value){
         if(o.has(key)===true)
         {
            throw new Error('Attempt to add key that already exists');
         }
         storedPairs[key] = value;
         return storedPairs;
      },

      update: function(key,value){
         if(o.has(key)===false){
            throw new Error('Key does not exist');
         }
         storedPairs[key] = value;
         return storedPairs;
      },

      remove: function(key){
         if(o.has(key)===false){
            throw new Error('Key does not exist');
         }
         delete(storedPairs.key);
      }
   };
   // Use this object to store the key-value pairs:
   var storedPairs = {};

   // Add initialization code here

   // Add local functions here

   // Prepare the object o before returning it

   return o;
}


// Do NOT change anything below this line.
/*
 * To allow node.js to run our tests. DO NOT CHANGE!
 */
try {
   module.exports = {
      makeMap: makeMap
   };
} catch (e) {}
