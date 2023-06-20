/*
* g is used for global search which means the search will not return after the first match.
* i is used for case-insensitive search meaning that a match can occur regardless of the casing.
* m is used for multiline search.
* u is used for Unicode search.
*/

// let str = "Hello! How are you, hello, hello"; 

// let regex = /How/i; // case insensitive search > searches for how and returns the first index where it occurs.

// console.log("-----------------------------------------------------")
// console.log(str.match(regex));

// let regex2 = /hello/ig; //  Globally searches for the hello and returns all the hello in an array
// console.log(str.match(regex2)); 

// console.log("-----------------------------------------------------")

/* 

* Anchors and Boundaries:
* Anchors are metacharacters that match the start and end of a line of text they are examining. You use them to assert where a boundary should be.

* The two characters used are ^ and $.
* ^ asserts the start of the line
* $ asserts the end of the line

*/

// let regex3 = /^I/ 
// let str2 = "I am lazy cat";
// console.log(str2.match(regex3)); 

// console.log("-----------------------------------------------------")


// let regex4 = /(r|T|e){2,3}/gi;

// let str3 = "street"; 
// console.log(str3.match(regex4)); 

/* check for phone number using regex */

// let regex = /^[6-9][0-9]{9}/; 

// let phone = "7973699425"; 

// console.log(regex.test(phone)); 

