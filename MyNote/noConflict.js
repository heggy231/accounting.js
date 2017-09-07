// ## Video 7: AccountingJS 7: noConflict

// This one talks about the .noConflict method that's in AccountingJS as well as many other libraries such as jQuery and Underscore.

// - Problem:

// window.sandwichJS has an original value.
window.sandwichLibrary = 'Library with books about sandwiches';
 
// SandwichJS loads.
(function() {
  var breads = {
    wheat: 'The healthy option',
    white: 'The unhealthy option'
  };

  var fillings = {
    turkey: 'For less fat sandwiches',
    hummus: 'For Greeks'
  };

  var sandwichLibrary = {
    breads: breads,
    fillings: fillings
  };

  if (typeof librarySystem !== 'undefined') {
    // Handle librarySystem case.
    librarySystem('sandwichLibrary', function() {
      return sandwichLibrary;
    });    
  } else {
    // Handle window case.
    
    // this is the string sandwichLibrary
    var oldSandwichLibrary = window.sandwichLibrary;

 
    sandwichLibrary.noConflict = function() {
      window.sandwichLibrary = oldSandwichLibrary;
      return sandwichLibrary; /* sandwichLibrary can be referred as this*/
    }
    window.sandwichLibrary = sandwichLibrary;
  }
})();
debugger;
// Solution for problem of conflicting variable:
//   This will reset windwo.sandwichLibrary to the original value.
//   Refer back to orginal string.
// .noConflict will also return the sandwichLibrary object.
var sandwichJS = sandwichLibrary.noConflict(); // ref obj libSystem

// You want to print window.sandwichLibrary (sandwichLibrary);
console.log(sandwichLibrary)

// We can still use SandwichJS.
console.log(sandwichJS.breads.white);

