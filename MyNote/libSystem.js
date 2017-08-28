librarySystem('sandwichLibrary', function() {
  var breads = {
    wheat: 'The healthy option',
    white: 'The unhealthy option'
  };

  var fillings = {
    turkey: 'For less fat sandwiches',
    hummus: 'For Greeks'
  };

  var sandwichLibrary = {
    breads: breads, // breads obj above
    fillings: fillings // fillings obj above
  };

  return sandwichLibrary;
});

console.log(librarySystem('sandwichLibrary'));



// ## librarySystem approach. One global variable period.
// 1. Create: librarySystem('libraryName', function() { /* return library */ });
// 2. Use: librarySystem('libraryName');

// final librarySystem:
// (function(){
  
//   var libraryStorage = {};
  
//   // Cruicial: callback function returns the library
//   function librarySystem(libraryName, callback){
//     if (arguments.length > 1) {
//       // Creating a library
//       // create libraryStorage prop name to be each libName
//       // set it equal to return value of callback function
//       libraryStorage[libraryName] = callback();

//     // At this stage, assume that we already have library.
//     //  therefore, grab the library from libraryStorage
//     //  then, grab the specific libraryName
//     } else {
//       // return specific library object
//       return libraryStorage[libraryName];
// 	}
//   }

//   // Expose librarySystem to the window so we can access libSystem
//   //  by attaching the object libSystem to window
//   window.librarySystem = librarySystem;

// })();