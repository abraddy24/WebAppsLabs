/*
 * Name 1: Alex Braddy
 * Name 2: Charlie Myre
 */

/*
 * BINARY SEARCH
 */
var binarySearch = function binarySearch(arr, val) {
   var lo = 0, hi = arr.length, mid = Math.floor((lo + hi)/2);

   // You may need to add things here


   while (lo <= hi) {     // You should change this with a proper condition
      // You will need to add things here
      if((mid === hi || mid === lo) && arr[mid] !== val){
         return false
      }
      if(arr[mid] > val){
         end = mid;
      } else if(arr[mid] < val) {
         lo = mid;
      }else {
         return mid;
      }
   }

   // You may need to add things here

};

/*
 * COUNTING TAGS
 */
var countTags = function countTags(items) {
   // Declare your local variables here. One was done for you.
   var tagCounts;
   var arr = []
   var i = 0;
   for(item in items){
      if(Array.isArray(items[i] === true)){
         
      }
   }
   }
   return tagCounts;
};

/*
 * EXTRACT HASHTAGS
 */
var extractHashTags = function extractHashTags(str) {
   var arr = [];
   var i = 0;
   var m = str.match(/#\w+/g);
   if(arr.length === 0){
      arr.push(m);
   }else{
      while(i <= arr.length){
         if (m === arr[i]){
            i++;
            continue;
         }else{
            arr.push(m);
         }
      }
   }
   return arr;
};
