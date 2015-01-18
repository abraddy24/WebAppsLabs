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
   var tagCounts = new Object();
   var arr = [];
   if(items.length === 0){
      return tagCounts;
   }else{

      for(var i = 0; i < items.length; i++){

         if(items[i].hasOwnProperty('tags')===false){
         }else{

               if(Array.isArray(items[i].tags)===false){
               }else{

                  for(var j = 0; j < items[i].tags.length; j++){

                     if (tagCounts.hasOwnProperty(items[i].tags[j])===false){
                        tagCounts[items[i].tags[j]] = 1;
                     }else{
                     tagCounts[items[i].tags[j]]+= 1;
                     }
                  }
               }
            }
         }
      }
   return tagCounts;
};

// /*
//  * EXTRACT HASHTAGS
//  */
var extractHashTags = function extractHashTags(str) {
   var arr = [];
   var r2 = []
   var i = 0;
   var m = str.match(/#([a-z]+)/gi);
   var temp;

   if(m == undefined){
      return r2;
   }else{
      for(i =0; i < m.length; i++){
            arr[i] = m[i].replace('#',"");
            temp = arr[i];
         
            for(var j = 0; j < arr.length; j++){
               if(temp === arr[j] && j !== i){
                  delete arr[j];
               }
            }
      }
   }

   return arr;
};
