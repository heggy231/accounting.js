(function() {
  // step 1: copy what is common about both
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

  // if librarySystem is undefined - we know developer
  //  is not using libSystem
  // if !== undefined means libSystem exists
  // OR if (typeof librarySystem === 'function')
  if (typeof librarySystem !== 'undefined') {
    // Handle librarySystem case.
    librarySystem('sandwichLibrary', function() {
      return sandwichLibrary;
    });    
  } else {
    // Handle window case.
    window.sandwichLibrary = sandwichLibrary;
  }


})();




