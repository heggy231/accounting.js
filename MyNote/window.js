(function(){
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

  window.sandwichLibrary = sandwichLibrary;

})();

console.log(sandwichLibrary);


// ## window. approach: One global variable per library
// 1. Create: Run library in IIFE and attach to the window.
// 2. Use: Access library from window.