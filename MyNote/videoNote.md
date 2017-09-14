## AccountingJS 1: Introduction to the library
This is everything we've learned (callbacks, test driven development, testing frameworks) in a real library that's maintained by a real company. This is reality hitting you in the face. It's one of those jumps where things will start feeling materially different, but I think you're all ready for it. This is what it feels like to escape from tutorial land. All other tutorials will be kind of ruined for you after this if they weren't already. I also tried to have a little fun with the intro and do something different by starting from a familiar place (StackOverflow), so things feel even more real. You'll see what I mean when you start watching.


https://watchandcode.com/courses/77710/lectures/1645646
format a price money in JavaScript research in stackoverflow
- recommend jQuery for DOM manipulations
read over the solutions in stackoverflow
https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
solution to look at
http://openexchangerates.github.io/accounting.js/
tiny library written by https://openexchangerates.org/ expert in money

https://openexchangerates.org/about
github https://github.com/openexchangerates/accounting.js
doc: http://openexchangerates.github.io/accounting.js/
stackover flow different ways to implement: https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript


https://glitch.com/edit/#!/acc-js-watchcode?path=README.md:20:83

reminder: https://github.com/gordonmzhu/cheatsheet-js
cheatsheet on how to read source code

forked from gordon's https://github.com/heggy231/accounting.js

Documentation: 
1) readme.md in github
- open source project idea: http://openexchangerates.github.io/money.js/ related topic on money

vocabulary: 
- client-side: anything on browser 
- server-side: anything that is not on browser (server)
- Changelog: release notes what updates changes for each version of app
2) open exchange site doc:
http://openexchangerates.github.io/accounting.js/

## Video 2 AccountingJS 2: Approaching docs like a pro
In this video, we look at how you can approach documentation like a pro. Along the way, we'll also encounter minified JavaScript and talk about how it differs from un-minified code.


Look over the demo function on the index.html from the github which will help you how to create this in app environment

<script type="text/javascript">
		// demo functions:
		jQuery(document).ready(function($) {
			var numbers = [123.5, 3456.615, 777888.99, -5432, -1234567, 0];
			// Use accounting.js to format the list of numbers several ways:
			var formatted = accounting.formatColumn(numbers, "$ "),
			    different = accounting.formatColumn(numbers, {
			    	symbol:"HK$",
			    	precision:0,
			    	format: {
			    		pos : "%s %v",
			    		neg : "%s (%v)",
			    		zero : "%s --"
			    	}
			    }),
			    european  = accounting.formatColumn(numbers, {
			    	symbol: '&euro; ',
			    	thousand:'.',
			    	decimal:','
			    }),
			    symbolAfter = accounting.formatColumn(numbers, {
			    	symbol : "GBP",
			    	format : "%v %s"
			    });
			// Concat some nasty demo HTML:
			for ( var i = 0; i < numbers.length; i++ ) {
				$('<tr><td>'+numbers[i]+'</td><td>'+formatted[i]+'</td><td>'+different[i]+'</td><td>'+european[i]+'</td><td>'+symbolAfter[i]+'</td></tr>').appendTo('table#demo-table tbody');
			}
			// Try it yourself clicky demo:
			var $demoValue = $('#demo-number-value'),
			    $demoSymbol = $('#demo-number-symbol'),
			    $demoResult = $('#demo-number-result');
			$demoValue.add($demoSymbol).bind('keydown keyup keypress focus blur paste change', function() {
			 	var symbol = $demoSymbol.find(':selected').val(),
			 	    result = accounting.formatMoney(
			 	    	$demoValue.val(),
			 	    	symbol,
			 	    	2,
			 	    	($demoSymbol.find(':selected').data('locale') === 'european') ? "." : ",",
			 	    	($demoSymbol.find(':selected').data('locale') === 'european') ? "," : "."
			 	    );
				$demoResult.text(result);
			});
			// Try it yourself clicky column formatting demo:
			var $columnValues = $('#demo-column').find('input'),
			    $columnOutputs = $('#demo-column').find('.output'),
			    $columnOutputs2 = $('#demo-column').find('.output2');
			$columnValues.bind('keydown keyup keypress focus blur paste', function() {
			 	var list = $.map( $columnValues, function(each) { return $(each).val(); } ),
			 		formatted = accounting.formatColumn(list, {
			 			format : "%s %v"
			 		}),
			 		formatted2 = accounting.formatColumn(list, {
			 			symbol : "GBP",
			 			precision : 0,
			 			format : {
			 				pos : "%s %v",
			 				neg : "%s (%v)",
			 				zero: "%s --"
			 			}
			 		});
			 	$.each($columnOutputs, function(i, each) {
			 		$(each).text(formatted[i]);
			 	});
			 	$.each($columnOutputs2, function(i, each) {
			 		$(each).text(formatted2[i]);
			 	});
			});
		});
		// prettify:
		prettyPrint();
		// twitter:
		(function(d, t) {
			var g = d.createElement(t),
				s = d.getElementsByTagName(t)[0];
			g.async = true;
			g.src = 'http://platform.twitter.com/widgets.js';
			s.parentNode.insertBefore(g, s);
		})(document, 'script');
		// google plus:
		window.___gcfg = {lang: 'en-GB'};
		(function() {
			var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
			po.src = 'https://apis.google.com/js/plusone.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
		})();
	</script>

When running the index.html. you see some error "Failed to execute 'postMessage' on 'DOMWindow':..".
How to get rid of that:
- Google Plus code is upset; since we are running it its google plus code local file.
  simply delete google plus code at the bottom of the file.

fun in console: 

debugger;
accounting.formatMoney(500);

### Video3: 
- Topic: Immediately invoked function expressions or "IIFEs" for short

function sayHi() {
  console.log('hi');
}  // sayHi function 

sayHi(); // hi

// wrap the function with parenthesis

(function sayHi() {
  console.log('hi');
})() // (sayHi)();
// output: hi

(sayHi)()
// hi
// Immediately invoked function expressions or "IIFEs" for short


## AccountingJS 3: What are IIFEs?
- what IIFE is doing for AccountingJS
* variable conflict issue get resolved
What is Variable conflict?
variable with same name with different values.

// accountingJS's number var
var number = 10;

// Our program
var number = 20;

// our number gets overwritten

- IIFEs way to exploit this feature of JS: variable declared inside of f(x)
is not available outside of function.
ex) 
// AccJS's number variable
var number = 10;

// ourProgram
function ourProgram() {
  var number = 20;
  console.log(number);
}

console.log(number);
// output: 10 due to globally declared variable

Let's run ourProgram()
ourProgram() // runs the number delcared inside of ourProgram() function.
// output: 20

IIFEs helps not conflict variable named same. 
AccJS hides all of its declared variable inside of function which
  hides them globally. (stops variable conflicts)

- try out:
** this function is same as second IIFE:

function accountingJS(root, undefined) {
  // the accountingjs code;
  console.log(root);
} 
accountingJS(this)

** IIFE
(function accountingJS(root, undefined) {
  // the accountingjs code;
  console.log(root);
} (this))

// this points to window since it is the first 
//  argument pass into function

** summary of IIFE
// global
var number = 20;
​
// lives only inside of function
(function() {
  var number = 12;
})();
​
(function() {
  var number = 33;
})();

- next odd thing: what is undefined inside of argument.
(function(root, undefined) {
  // the accountingJS code;
  console.log(root);
}(this));

Defensive programming technique that ensure that undefined value
doesn't get changed. In prev. version of JavaScript you can change value of undefined.

Given: function(root, undefined)
when user passes in only one argument and call the function since no 2nd argument is given
  undefined value is assigned as undefined.  

(function(root, undefined) {
  // the accountingJS code;
  console.log(root);
}(this));

// undefined is here incase undefined = true; 

### AccountingJS 4: IIFEs and sharing data

## IIFE has issues:
// Demonstrate one of the problem of IIFE

(function(){
  // sandwich.js: A simple library for sandwich ingredients.
  //  helps create virtual sandwich
  // Demo usage: sandwichLibrary.breads.wheat ==> 'The healthy option'

  var breads = {
    wheat: 'The healthy option',
    white: 'The unhealthy option'
  };

  var fillings = {
    turkey: 'For less fat sandwiches',
    hummus: 'For Greeks'
  };

  // combine 2 breads, fillings objects with another object
  var sandwichLibrary = {
    breads: breads, // breads obj above
    fillings: fillings // fillings obj above
  };

})();

// now all variables are protected that we can't access any variables.
sandwichLibrary.breads.wheat;
// output: not defined error is thrown

- understanding Window..
window has DOM, many function, Window represents browser.

> window
> window.document // DOM

Another point about window: everything in window is accessible through out
 programming.  

- How to get to the variables declared inside of IIFE?
// Demonstrate one of the problem of IIFE

(function(){
  // sandwich.js: A simple library for sandwich ingredients.
  //  helps create virtual sandwich
  // Demo usage: sandwichLibrary.breads.wheat ==> 'The healthy option'

  var breads = {
    wheat: 'The healthy option',
    white: 'The unhealthy option'
  };

  var fillings = {
    turkey: 'For less fat sandwiches',
    hummus: 'For Greeks'
  };

  // combine 2 breads, fillings objects with another object
  var sandwichLibrary = {
    breads: breads, // breads obj above
    fillings: fillings // fillings obj above
  };

})();

** problem: all variables are protected that we can't access any variables.
sandwichLibrary.breads.wheat

** Solution: Assign sandwichLibrary onto IIFE window object.

(function(){
  // sandwich.js: A simple library for sandwich ingredients.
  //  helps create virtual sandwich
  // Demo usage: sandwichLibrary.breads.wheat ==> 'The healthy option'

  var breads = {
    wheat: 'The healthy option',
    white: 'The unhealthy option'
  };

  var fillings = {
    turkey: 'For less fat sandwiches',
    hummus: 'For Greeks'
  };

  // combine 2 breads, fillings objects with another object
  var sandwichLibrary = {
    breads: breads, // breads obj above
    fillings: fillings // fillings obj above
  };

  // to get access to variable created inside IIFE
  // create a property on global window object
  window.sandwichLibrary = sandwichLibrary;

})();

now try:
sandwichLibrary.breads.wheat
// output: "The healthy option"

- Note: once you assign window.sandwichLibrary to the global window object you can also
-        Use sandwichLibrary in other IFFE 

(function () {
  console.log(sandwichLibrary.breads.white);
}) ();
// output: The unhealthy option

- Let's mimic the way accounting JS called the IFFE
(function(root, undefined){
  // sandwich.js: A simple library for sandwich ingredients.
  //  helps create virtual sandwich
  // Demo usage: sandwichLibrary.breads.wheat ==> 'The healthy option'

  var breads = {
    wheat: 'The healthy option',
    white: 'The unhealthy option'
  };

  var fillings = {
    turkey: 'For less fat sandwiches',
    hummus: 'For Greeks'
  };

  // combine 2 breads, fillings objects with another object
  var sandwichLibrary = {
    breads: breads, // breads obj above
    fillings: fillings // fillings obj above
  };

  // ***** we changed window.sandwichLib to root.sandwichLib
  // root['sanwichLibrary'] = sandwichLibrary;
  root.sandwichLibrary = sandwichLibrary;

})(this);

- HW: create your own library and call it on outside of function.

function(root, undefined){
  // homeGym.js: A simple library for home gym equipments.
  //  helps create virtual home gym.
  // Demo usage: homeGymLibrary.outfit.summer ==> 'shorts and tank tops'

  var outfit = {
    summer: 'shorts and tank tops',
    winter: 'sweats pants and layer shirts'
  };

  var weights = {
    beginner: '3 lbs',
    expert: '10 lbs'
  };

  // combine outfit, weights objects with another object
  var homeGymLibrary = {
    outfit: outfit, // breads obj above
    weights: weights // fillings obj above
  };

  // root['homeGymLibrary'] = homeGymLibrary;
  root.homeGymLibrary = homeGymLibrary;

// this points to window object
})(this);

window.homeGymLibrary 
// {outfit: {…}, weights: {…}}
object we created inside of IIFE is accessible

> homeGymLibrary.outfit.summer
// "shorts and tank tops"


***AccountingJS 5: Scopes, locals, closures, globals***
simple concepts hiding behind complicated vocabulary

// demo function

(function() {
  var name = 'james';

  function sayName1() {
    console.log(name);
  }

  // expose our var to other parts of our code
  window.sayName1 = sayName1;
})();

(function() {
  var name = 'kenny';

  function sayName2() {
    console.log(name);
  }

  // expose our var to other parts of our code
  window.sayName2 = sayName2;
})();

sayName1(); // james
sayName2(); // kenny

Keep this in mind: // Functions can always remember the variables that they could see at creation
The variable that functions could see at their creation become a defining characteristic of their 
  functions even though code of the function is identical. For our example, console.log(name) for both
  functions sayName1 and sayName2.  However, ouput for sayName1() and sayName2() are the same.

# Definition lesson inside of the debugger right column
- Scope: 1) describe where you are in the code (ex: Line 2 of code), 2) what you can see from where you are (ex: window global obj when outside of function)
Note: scope depends on perspective (where you are in the program)

Note: when you are in the function you can see OUT; BUT from the outside you can't see IN.

- Global window object: Can be seen no matter where you are/ throught out the project.

- Local: variable declared locally.  by default this obj is set to window object

- 3 cases where variables can be visible: 
1) variables are global. variables are saved on window object, 
2) variables are local. you define variables yourself inside of your function you are on,
3) variables are defined in other functions.  Closure section in debugger

(function() {
  var name = 'james';

// name variable falls in category 3, Closure section in debugger
  function sayName1() {
    console.log(name);
  }

  window.sayName1 = sayName1;
})();

In console, debugger: under scope> Closure section 
- Closure: variable from other function that is enclosing current funtion.

ex) 

(function enclosingFunction() {
	var name = 'james';

// ******** Lets focus on sayName1() ***********
	function sayName1() {
		console.log(name);
	}

	window.sayName1 = sayName1;
})();

debugger;
sayName1();

- Analysis of above function: It is IIFE and we exposed sayName1() function to the window object.

- Inside of sayName1(): 
1) Local, we see this: window object inside of browser
2) Global,  window object inside of browser 
3) Closure - variable defined in enclosing function such as 

- From sayName1(), variable that we can be accessed from sayName1() falls in 3 categories:
1) Locally defined: variables defined locally/ inside of sayName1()
2) Globally defined: variables on window object
3) Closure: inside of enclosing function. ex) we have IIFE and insde that function we have declared
            name variable.

- Break down of Closure:
##Higher Level definition of closure: Functions can always remember the variables that they could see at creation because functions save reference to those variables
- This is why sayName1() function can refer to name variable.
- This is why sayName1() knew to print out james everytime since name variable's reference was saved.  This is high level summary of closure.  Functions remember variables present at the time of its creation by saving references to those variables.

It is obvious that function can see variables inside of them (local variables).  However, they 
can also see variables outside of them which is enclosing functions.  The technical term of this concept is closure.  From earlier example of sayName1, you can see local variables, also see varibles defined in enclosing function.  ex: name variable.  Lastly, you can of course see global variables.

- two things you need to know about closure:

1) Functions can always remember the variables that they could see at creation (due their ability to save reference to those variables)
2) Functions can see variales outside of them which is enclosing functions.

A great example to visualize this concept is to create function that encloses another function.

(function enclosingFunction() {
	var name = 'james';

  // ******** Lets focus on sayName1() ***********
	function sayName1() {
		console.log(name); // closure variable since var name leaves outside of the function enclosing function.
	}

	window.sayName1 = sayName1;
})();

#Video 6: AccountingJS 6: librarySystem


Attaching a single library object to window is a very effective technique for reducing the number of global variables in your code. But with this approach, every library in your app has a global variable. So in an extreme example, if your app uses 100 libraries, you'll create 100 global variables. We can do a lot better though. By using the power of functions, we can create a world where we have just a single global variable no matter how many libraries our app uses.

IIFE benefits are prevent variable naming confict.  Each library gets saved to the global object which keeps the every variables to saved on global object (which causes the variable naming conflict)
IIFE hides all variables from rest of project and in turn you share one object rest of your program.
One way to share your library globally is window.sandwichLibrary = sandwichLibrary;

- However, in this video 6, we imagine scenario where we have many libraries (1000 library).  Then this approach of sharing one object to rest of your program globally becomes too many variable saved on global object issue again.

- Current solution of saving one object to global object per library.

(function(){
  // sandwich.js: A simple library for sandwich ingredients.
  //  helps create virtual sandwich
  // Demo usage: sandwichLibrary.breads.wheat ==> 'The healthy option'

  var breads = {
    wheat: 'The healthy option',
    white: 'The unhealthy option'
  };

  var fillings = {
    turkey: 'For less fat sandwiches',
    hummus: 'For Greeks'
  };

  // combine 2 breads, fillings objects with another object
  var sandwichLibrary = {
    breads: breads, // breads obj above
    fillings: fillings // fillings obj above
  };

  window.sandwichLibrary = sandwichLibrary;

})();

// calling sandwichLibrary
sandwichLibrary

- Let's resolve too many library object saved on global window object.
We will use Library System function:

## Current approach. One global variable per library
1. Create: Run library in IIFE and attach to the window.
2. Use: Access library from window.

## Another approach. One global variable period.
1. Create: librarySystem('libraryName', function() { /* return library */ });
2. Use: librarySystem('libraryName');

model librarySystem:
(function() {

// funtions can see variables present at the time of their creation
  var libraryStorage = {};  

  function librarySystem(libraryName, callback) {
    
    // To figure out which stage at librarySystem:
    // inside of function, we have arguments variable
    // case 1) create: librarySystem('Name', callback); more than 1 arguments
    if (arguments.length > 1){
      // Creating a library stage: we want to store lib so we may access it later
        {libraryName: callback(),
         libraryName2: callback2()}

    }
  }
})();

revision1 librarySystem: 
(function() {

// funtions can see variables present at the time of their creation
  var libraryStorage = {};  

  function librarySystem(libraryName, callback) {
    
    // To figure out which stage at librarySystem:
    // inside of function, we have arguments variable
    // case 1) create: librarySystem('Name', callback); more than 1 arguments
    if (arguments.length > 1){
      // Creating a library stage: we want to store lib so we may access it later
      // librarySystem('libraryName', function() { /* return library */});
      libraryStorage[libraryName] = callback();
    // case 2) Use: librarySystem('name'); only have a single argument
    } else {
      // library object
      return libraryStorage[libraryName];
    }
    
    window.librarySystem = librarySystem;
  }
})();

final librarySystem:
(function(){
  
  var libraryStorage = {};
  
  // Cruicial: callback function returns the library
  function librarySystem(libraryName, callback){
    if (arguments.length > 1) {
      // Creating a library
      // create libraryStorage prop name to be each libName
      // set it equal to return value of callback function
      libraryStorage[libraryName] = callback();

    // At this stage, assume that we already have library.
    //  therefore, grab the library from libraryStorage
    //  then, grab the specific libraryName
    } else {
      // return specific library object
      return libraryStorage[libraryName];
	}
  }

  // Expose librarySystem to the window so we can access libSystem
  //  by attaching the object libSystem to window
  window.librarySystem = librarySystem;

})();

- Create:
librarySystem('sandwichLibrary', function() {
  // sandwich.js: A simple library for sandwich ingredients.
  //  helps create virtual sandwich
  // Demo usage: sandwichLibrary.breads.wheat ==> 'The healthy option'

  var breads = {
    wheat: 'The healthy option',
    white: 'The unhealthy option'
  };

  var fillings = {
    turkey: 'For less fat sandwiches',
    hummus: 'For Greeks'
  };

  // combine 2 breads, fillings objects with another object
  var sandwichLibrary = {
    breads: breads, // breads obj above
    fillings: fillings // fillings obj above
  };

  // callback function must return library object for system to work
  return sandwichLibrary;
});

- Use: librarySystem
librarySystem('sandwichLibrary')

- IIFE the librarySystem and run through debugger
(function () {
  debugger;
  var sandwichLibrary = librarySystem('sandwichLibrary');

  console.log(sandwichLibrary);
})();

// pay attention to closure, local, global each step

Compare and contrast libSystem.js vs. window.js.
libSystem: One global variable period.
window: One global variable per library

- Create a dynamic system that adopts to what programmer wants to 
do.  Program that knows to adopt to the approach that programmer wants to take.
Either libSystem vs. window.

*** if libSystem is defined go with libSystem approach
if not; go with window approach

## DynamicSystem function: 

version 1 (adds both window and lib system functionality
but it is not dynamic): 
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
  // Handle window case.
  window.sandwichLibrary = sandwichLibrary;

  // Handle librarySystem case.
  librarySystem('sandwichLibrary', function() {
    return sandwichLibrary;
  });

})();

version 2 (let's add dynamically choosing which system):

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
  if (/* librarySystem function exists */) {
    // Handle librarySystem case.
    librarySystem('sandwichLibrary', function() {
      return sandwichLibrary;
    });    
  } else {
    // Handle window case.
    window.sandwichLibrary = sandwichLibrary;
  }


})();

version 3 (how do we check if library system exists?)

In console:
// returns variable type what we are given
typeof 3
// "number"

typeof 'heggy'
"string"
typeof function () {} // this is the check we want to use if library system exists or not
"function"

// if librarySystem is undefined - we know developer
  //  is not using libSystem
  if (/* librarySystem function exists */) {
    // Handle librarySystem case.
    librarySystem('sandwichLibrary', function() {
      return sandwichLibrary;
    });    
  } else {
    // Handle window case.
    window.sandwichLibrary = sandwichLibrary;
  }
****************************** solution ****

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

# let's run through debugger

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

  debugger;

  // if librarySystem is undefined - we know developer
  //  is not using libSystem
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

- Connect the DOT: back to AccJS code
This method of dynamically loading library (often times called modules which is more general term than library) is shown on line 379.

library: third party wrote a library
module: general that you could have written or any person could have written to avoid creating global variable conflict.

https://github.com/gordonmzhu/accounting.js




## Video 7: AccountingJS 7: noConflict

This one talks about the .noConflict method that's in AccountingJS as well as many other libraries such as jQuery and Underscore.

- Problem:

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
      return sandwichLibrary;
    };
 
    window.sandwichLibrary = sandwichLibrary;
  }
})();

// Solution for problem of conflicting variable:
//   This will reset windwo.sandwichLibrary to the original value.
//   Refer back to orginal string.
// .noConflict will also return the sandwichLibrary object.
var sandwichJS = sandwichLibrary.noConflict(); // ref obj libSystem

// You want to print window.sandwichLibrary (sandwichLibrary);
console.log(sandwichLibrary)

// We can still use SandwichJS.

console.log(sandwichJS.breads.white);

// output: 
// Library with books about sandwiches
// The unhealthy option

Note: this library can handle different environements.
If inside of environment where library system loader exist, it will load that way; Otherwise, library will load onto global window object.

- some outside reading relating global variable conflicts:
1) https://api.jquery.com/jquery.noconflict/
   - lot of good examples to reflect on how to handle noConflict();
2) https://github.com/jashkenas/underscore/blob/master/underscore.js

   - ctr + f on the page to find noConflict, the you will see
   
  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode
  // just like our example of sandwichLibrary.noConflict

    sandwichLibrary.noConflict = function() {
      window.sandwichLibrary = oldSandwichLibrary;
      return sandwichLibrary;
    };

  // jQuery library runs in *noConflict* mode

    _.noConflict = function() {
      // root is window
      root._ = previousUnderscore;
      // this points to left of the dot of method it was called
      // "_" << this
      return this;
    };

# incase there is global variable conflict
index.html of the accountingJS
Add <script> tag at line 366.

	<script> // Original value for window.accounting.
	window.accounting = 'The original accounting.';
  </script>

Then in console run:
accounting // accounting library; no string 'The original accounting.'
// lets reset to run the original old string accounting
var accountingLibrary = accounting.noConflict();
// now call accounting to see original string accounting has restored
accounting 

- let's look at this in debugger
first refresh the page,

debugger;
accounting.noConflict();
// returns the accountingLib object

- run debugger to see how the oldAccounting initially gets set

	/* --- Module Definition --- */

	// Export accounting for CommonJS. If being loaded as an AMD module, define it as such.
	// Otherwise, just add `accounting` to the global object
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = lib;
		}
		exports.accounting = lib;
	} else if (typeof define === 'function' && define.amd) {
		// Return the library as an AMD module:
		define([], function() {
			return lib;
		});
	} else {
		debugger;
		// Use accounting.noConflict to restore `accounting` back to its original value.
		// Returns a reference to the library's `accounting` object;
		// e.g. `var numbers = accounting.noConflict();`
		lib.noConflict = (function(oldAccounting) {
			return function() {
				// Reset the value of the root's `accounting` variable:
				root.accounting = oldAccounting;
				// Delete the noConflict method:
				lib.noConflict = undefined;
				// Return reference to the library to re-assign it:
				return lib;
			};
		})(root.accounting);

- lib.noConflict
lib.noConflict = undefined;
// this resets it

- refactor

		lib.noConflict = (function(oldAccounting) {
			return function() {
				// Reset the value of the root's `accounting` variable:
				root.accounting = oldAccounting;
				// Delete the noConflict method:
				lib.noConflict = undefined;
				// Return reference to the library to re-assign it:
				return lib;
			};
		})(root.accounting);

*** refactor ****
// My approach which is similar to underscore.
		var oldAccounting = root.accounting; // root = window
		lib.noConflict = function(){
			root.accounting = oldAccounting;
			return lib;
		}


- Last concept:
Prototype: the original or **model on which something is based** or formed.

https://docs.google.com/presentation/d/1GI_RWh13x1gFrbdr3aMuo0gmTV5nBVLeqNOfktYIfv4/edit?usp=sharing

Diagram to visualize prototype 

- 2 main methods you need for prototype

// creating Object and sets the prototype of that object
//  ex) we want to create myDog and set the prototype to be dog
// 
// 1) Object.create(dog);

// from myDog object returns you the Prototype associated with myDog object from Dog object
// 2) Object.getPrototypeOf(myDog);


- let's try it out.

var dog = {
  fetch: function() {
    console.log('fetch');
  }
};

// create new object myDog and sets the prototype of that object to dog
//  this step builds that connection btwn myDog's protype to dog obj
var myDog = Object.create(dog);
// set the unique data name in myDog
myDog.name = 'Alexis';

Next, let's create random dog

// set prototype of randomDog to be dog
// building the line / connector
var randomDog = Object.create(dog);

myDog.name and randomDog.name are already included in myDog and randomDog.
However, note that we have not added fetch method to neither.

try:
myDog.fetch() // fetch
randomDog.fetch() // fetch

try 2nd method Object.getPrototypeOf():
// this should be true since when we create myDog, randomDog
//  then we set both equal to Object.create(dog) which sets prototypeOf each to dog method
Object.getPrototypeOf(myDog) === dog // true
Object.getPrototypeOf(randomDog) === dog // true 

Note: // Whenever you use braces Javascript will
//  automatically set the prototype of the object to
//  the default object prototype.

ex: 
var dog = {
  fetch: function() {
    console.log('fetch');
  }
};

- last layer of prototype

1) upper layer: what you created link for the Object 
2) last layer: prototype is null

// create a empty object
var normalObject = {};
// first layer prototype methods which has default methods such as 
//  has what you assigned and hasOwnProperty
var defaultObjectPrototype = Object.getPrototypeOf(normalObject);


ex) dog example:
var dog = {
  fetch: function() {
    console.log('fetch');
  }
};

var myDog = Object.create(dog);
myDog.name = 'Sweetie';
myDog.fetch() // fetch
var defaultObjectPrototype = Object.getPrototypeOf(myDog); // assigned method dog, native prototype methods
var secondLayerDefaultPrototype = Object.getPrototypeOf(defaultObjectPrototype); //just the prototype methods, no assigned method lives here
var finalLayerDefaultPrototype = Object.getPrototypeOf(secondLayerDefaultPrototype); // final layer of prototype: null

- Exception: only time you don't have the default Object Prototype.
Note: typof null // "object"
Object.create(null);
var noPrototype = Object.create(null);
Object.getPrototypeOf(noPrototype); // null

** This is exceptional since normalObjects will return prototype methods.

AccountingJS 9: Prototypes and constructors

This one is about how JavaScript's prototype system works with constructor functions. You'll learn exactly what happens when you use new and how Function.prototype is automatically assigned to new objects.

- Constructor functions' 4 unique standards:
  1. Capitalize its Constructor function Name
    ex) function Dog() {
          // this is set to an empty object, {}
          // this is returned
        }

  2. Use new keyword when creating new object off of constructor function

  3. Constructors automatically set 'this' to a fresh new object.  These two lines are then
     adding .name and .fetch to the new object.

         ex)   var testDog = new Dog();
          function Dog() {
              // this is set to object, {}
              this.name = name;
              this.fetch = function () {};
              // this is returned
          }

  4. Constructors automatically return the object at the end.  So this will return
     a new object with .name and .fetch.

        ex)   var testDog = new Dog();
          function Dog() {
              // this is set to object, {}
              this.name = name;
              this.fetch = function () {};
              // this is returned
          }

          var myDog = new Dog('Alexis');
          var randomDog = new Dog('Hey');

# How do you create new testDog object using constructor function Dog?  Use name happyDog

    function Dog(name) {
      // this is set to an empty object, {}
      this.name = name;
      // this is returned
    }

    var testDog = new Dog('happy dog');
    testDog // Dog {name: "happy dog"}


Diagram about constructor slide 8:
https://docs.google.com/presentation/d/1GI_RWh13x1gFrbdr3aMuo0gmTV5nBVLeqNOfktYIfv4/edit#slide=id.g24819be26f_0_7 

- What is the prototype of myDog and randomDog now?
Object.prototypeOf(myDog)
// constructor prototype, native prototype methods
Dog.prototype becomes prototype for every dog that is created by dog constructor.

- What is then Object.getPrototypeOf(Dog.prototype)?
Default.prototype that every object gets after getting created by Dog constructor function.

- Constructor function prototype diagram breakdown analysis:
1) redundancy of having fetch method repeated in both myDog, randomDog (will fix this)
2) The middle layer Object is Dog.prototype which inclues 2 properties (methods).  1) constructor method, 2) fetch method  (unique feature for constructor function)
3) Without constructor we have to create prototype object using Object.create(dog);  However, with constructor prototype link is done automatically for us by Dog constructor function.

Logic behind why Dog.prototype get created once new object is created by constructor function:
- So that myDog’s constructor function is Dog.

Diagram demonstrated in console:
  function Dog (name) {
	this.name = name;
}

// add fetch to Dog.prototype object
Dog.prototype.fetch = function() {
	console.log('fetch inside of Dog.prototype');
};

var myDog = new Dog('Alexis');
var randomDog = new Dog('Hey');

myDog // myDog {name: "Alexis"} Note there is no fetch directly under myDog
myDog.fetch() // fetch inside of Dog.prototype

Prove that myDog is linked to Dog.prototype object as its prototype:
Object.getPrototypeOf(myDog) === Dog.prototype // true

Object.getPrototypeOf(myDog);
// output: 
{fetch: ƒ, constructor: ƒ}
 fetch: ƒ ()
 constructor: ƒ Dog(name)
 __proto__: Object

Dog.prototype is also
// output: 
{fetch: ƒ, constructor: ƒ}
 fetch: ƒ ()
 constructor: ƒ Dog(name)
 __proto__: Object

* from slide 12, https://docs.google.com/presentation/d/1GI_RWh13x1gFrbdr3aMuo0gmTV5nBVLeqNOfktYIfv4/edit#slide=id.g25f6a4f8fb_1_25

- default object prototype ⇒  Object.prototype
  The reason for name update.  
  Try console, Object // ƒ Object( ) { [native code] }
  Every time you create Object, Javascript is creating its default Object.prototype
  Just as new Dog(‘Alexis’) gets Dog.prototype

*** Prove this point.
in Console: 
> var myObject = new Object();  // you don't do this usu. just demonstration purpose
> myObject // {} > _proto_
> Object.getPrototypeOf(myObject) === Object.prototype // true


Note: A word about creating array,
  [ ] ==> new Array()

  Each array you constructed will have default for array prototype methods that javascript
already prescribed.  Array.prototype.someMethod() like .forEach()

*** Summarize prototype lesson:
  * Capitalize constructors
  * Don’t forget ‘new’
  * Using prototypes makes it easier to distinguish between unique vs. shared properties.
      Prototypes brings in more communication value; not to mention eliminates redundancy.  People may read your code and think each method in object ex fetch is unique characteristic about that object.

  * Array.prototype.forEach()
      - Note about Array.prototype.forEach()
      * Array is a constructor which gets the Array.prototype as its prototype.  On prototype's method is .forEach().  Javascript wants all array to share .forEach() method accross all arrays by putting it on prototype object.  Same way we wanted to share fetch method by putting it on Dog constructor prototype object.

      [] // with new array

      // but in background
      new Array() // using Array constructor

      // same as
      {} new Object // using Object constructor
      // no .forEach method

      // However, if you call its prototype property on normalArray
      //  Then prototype object has .forEach() method on it.
      Object.getPrototypeOf(normalArray)

      var constructorArray = new Array();
      constructorArray // no forEach method.

      Array methods are on constructor's prototype property.
      > Object.getPrototypeOf(constructorArray) // now you can see forEach Method on it.
  * __proto__

> var newObject = {};
> newObject // it has __proto__ property, it is way to inspect what prototype an object is linked to.

## Accounting JS 10: isString, !!, and String.prototype
https://watchandcode.com/courses/77710/lectures/2001287

We start by looking over the codebase briefly to see how everything is organized and then carefully look at one of the internal helper methods, isString. You'll learn about some weird stuff like !!, understand unnecessarily complicated logic statements, and see why primitive string values can access methods on String.prototype.

- start with /* --- Internal Helper Methods --- */
1) 	function isString(obj) {
		return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
	}

Let's break down !!. 
! takes opposite of what value comes after it
!true // false
// Turns what is inside of ( ) into corresponding boolean value null corrspd. false
!(null) // !(false) ==> true

// results corresponding boolean value of null
!!(null) // false !!(false) ==> !(true) ==> false

// results corresponding boolean value of whatever inside
!!(obj === '' || (obj && obj.charCodeAt && obj.substr))

- way to convert the value to boolean
Boolean(null)
Boolean(null) === !!(null) // same way of convert to boolean, true

- Note: Boolean function is more clear way to code than

	function isString(obj) {
		return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
	}

- (obj === '' || (obj && obj.charCodeAt && obj.substr)) AVOID writing code such as this
  Let's look at this code to understand.  Note there are 2 parts to this code.

  Part1) obj === ''
    OR
  Part2) (obj && obj.charCodeAt && obj.substr) 
    Note: we are using && twice, checking 3 tests that pass
      1stTest) obj val = null, undefined (false) but if it is a string, then it will pass.
      2ndTest) obj.charCodeAt & obj.substr are availabe in string.
                therefore, only pass when obj is string
                Note: var obj = null;
                // null corrsp boolean value false expect first test to fail
                > obj && obj.charCodeAt && obj.substr 
                // output: null
                We rely on !! to give us the corresponding boolean value

- Interesting short circuiting characteristic of Javascript:
var obj = ''; //empty string
obj && obj.charCodeAt && obj.substr // you may expect it will give you false
However it gives " " which means it stops evaluating once it finds false value.

var obj = 'heggy'; // case where obj string test should pass
(obj && obj.charCodeAt && obj.substr) // expect to be true, output is different.
Surprising finding: it returns the last value evaluated which is obj.substr not true or false.
Therefore, double bang operator is important here.
!!(obj.substr) // true

Why do we explictly test empty string?  (obj === '' || (obj && obj.charCodeAt && obj.substr))
  because !!(obj && obj.charCodeAt && obj.substr) will be false if obj is empty string.
  Therefore, if it is empty string; return true

- How does primitive string can have obj.charCodeAt methods like this?
var primitiveString = 'heggy';
primitiveString.substr()

// when you call .substr on stringJavaScript is creating object version of primitve string.
//  var objectString = new String('heggy'); // uses String constructor, which is object version of
//   primitive string and runs this code.  objectString.substr();  It gets value from objectString.substr();
//   once the value is returned then throws value away
// It creates object version of the string so you can run code as primitiveString.substr()

primitiveString.substr(), javascript creates following to accomodate .substr method to primitive string
var objectString = new String('heggy'); // uses String constructor (which is object version of primitive string)
// then it runs
objectString.substr(); // once value is returned, it gets trashed.
// summary: It creates object version of the string so you can run code as primitiveString.substr()

######## Proving its point. Add typeof method to prototype:
String.prototype.whatTypeAmI = function() {
	return typeof this; 
}

// myString.whatTypeAmI(); this is left of dot, this = myString
typeof primitiveString
"string"

primitiveString.whatTypeAmI()
"object"
/ as you see methods attached to age but theyare not on
/ primitive number type but borrowed from object version of this number

How does primitive number 50 gets methods?
var age = 50;
age.toFixed()
/ as you see methods attached to age but theyare not on
/ primitive number type but borrowed from object version of this number


## Fall-back case for Array.isArray() is unusual.
Note toString reference.

- Store reference to possibly-available ECMAScript 5 methods for later
	var nativeMap = Array.prototype.map,
	  nativeIsArray = Array.isArray,
		toString = Object.prototype.toString;

	function isArray(obj) {
		return nativeIsArray ? nativeIsArray(obj) : toString.call(obj) === '[object Array]';
	}

- Array.isArray([]) // returns T/F in native JavaScript 
- Odd things.  toString = Object.prototype.toString
   - why do we use Object.prototype.toString when we could use Array.prototype.toString?
   Array.toString() only shows you the content of what is passed in.
  [1,2,3].toString() //shows you what is inside of array "1,2,3"

Solution to decipher what type of object it is: Object.prototype.toString:
// Array.prototype.toString() is not use to show you what type of data type it is.  Just the content.
// Now, Object.prototype.toString is useful for deciphering whether something is Array or not.

var myObject = {};
myObject.toString();
//  Since myObject is {}object it has the prototype method for Object.prototype.toString
//   which tells us the dataType of object whether array or object
//  Also note: this key word inside .toString will point to myObject (left of the dot rule)
//   Therefore, if you like to use 'this' to somethingelse; then change it to another value which
//   we can use call method.

Object.prototype.toString.call([])  // it allows me to call this function and set .toString to whatever you want
// let's set this to empty array
>> output: "[object Array]"

## now let's read this isArray function
function isArray(obj) {
		return nativeIsArray ? nativeIsArray(obj) : toString.call(obj) === '[object Array]';
	}

if native IsArray exist; nativeIsArray(obj) ==> predefined: Array.isArray(obj) ==> output: T/F
else toString.call(obj) === '[object Array]'
      toString = Object.prototype.toString.isArray(obj)
      1) Borrow Object.prototype.toString method to check the type. Now we need set this to argument 
          we pass in.
      2) Use .call(obj) which sets 'this' to 'obj' that we pass inside of argument 
      Lastly, compare the result of Object.prototype.toString.isArray.call(obj) equals to '[object Array]'
  output: true if .isArray(obj) is array.

- To review what Object.prototype.toString.isArray(obj) is doing:
var myObject = {};
myObject.toString([]);
>> output: "[object Object]"  this is pointing to myObject not [ ] argument we want to test.
Therefore, we use object.prototype.call()

myObject.toString.call([]);
"[object Array]"

Object.prototype.toString.call() 
>> add Object.call() on Object.toString() will tells us the type of argument and sets 'this' to argument passed inside of .call([]) which is Object type Array.

### 2. Internal Helper Methods:
  function isObject(obj) {
      return obj && toString.call(obj) === '[object Object]';
  }

- BreakDown: 
Object.prototype.toString.call({}); // output "[object Object]"
checks if parameter passed in is indeed obj in isObject(obj)

** After you load up, accounting.js file on console try calling the function you created
- toString.call({ }) === '[object Object]'; // true
- toString.call({ name: 'heggy' }) === '[object Object]'; // true
- toString.call([ ]) === '[object Object]'; // false

*** fixing a bug on isObject function
- Note: when passing in null isObject(null); // output: null
How to fix this bug?  wrap it around Boolean.

before: function isObject(obj) {
		return obj && toString.call(obj) === '[object Object]';
	}

after: function isObject(obj) {
		return Boolean(obj && toString.call(obj) === '[object Object]');
	}

Test it out: isObject(null); // output: false

3) next function walk through
	function defaults(object, defs) {
		var key;
		object = object || {};
		defs = defs || {};
		// Iterate over object non-prototype properties:
		for (key in defs) {
			if (defs.hasOwnProperty(key)) {
				// Replace values with defaults only if undefined (allow empty/zero values):
				if (object[key] == null) object[key] = defs[key];
			}
		}
		return object;
	}

- Copy the function into console, to play around with it to learn its input/output value of this
 defaults(object, defs) function
1st) set a defaultCar (second argument: defs)

** Factory setting of defaultCar.
  var defaultCar = {
  wheels: 4,
  tires: 'standard',
  color: 'grey'
  };

** As a customer of a car, I want just regular default options
**  but I want to customize color to be 'blue'
  var heggyCar = {
  color: 'blue',
  };

** Remember to follow this format defaults(object, defs)
// defaults(object, defs)
// objects (heggyCar) = options you care customize such as color of the car
// default options (defaultCar) = Factory setting of defaultCar.

defaults(heggyCar, defaultCar); // all is default except for heggyCar customization
// output: {color: "blue", wheels: 4, tires: "standard"}
            color : "blue"
            tires : "standard"
            wheels : 4

# let's now look function line by line now we understand its usecase:

function defaults(object, def) {
  // checking to see its corresponding boolean value
  //  if they are true then leave it alone

  object = object || {}; 
}

- In console to play with object = object || {}:
  var object = {heggy: 'student'};
  object = object || {}; // output: {heggy: 'student'}
  // Keeps the original value since it has a truthy value
  //  however, if you set object as falsy value then it is set to {}
!!0 // false
object = object || {}; // output: {} since object is falsy therefore, return {} 

- next let's go thru extending object with a default object,
first we remodel our car example object.

var defaultCar = {
  color: 'red',
  wheels: 4
};
var myCar = {
  color: 'blue'
};

/* our code from accounting.js*/
function defaults(object, defs) {
		var key;
		object = object || {};
		defs = defs || {};
		/* Iterate over object non-prototype properties:*/
		for (key in defs) {
			if (defs.hasOwnProperty(key)) {
				/* Replace values with defaults only if undefined (allow empty/zero values):*/
				if (object[key] == null) object[key] = defs[key];
			}
		}
		return object;
}

defaults(myCar, defaultCar);
/* {color: "blue", wheels: 4} */

*** Read along line by line:  Using defaultCar and myCar example from above.
function defaults(object, defs) {
  /* loop thru each key inside of defaultCar object */
  /* ex: loop thru defaultCar's color, wheels properties */
  for(var key in defs){
    /* this .hasOwnProperty we will come back to it */
    if(def.hasOwnProperty(key)) {
      /* if myCar (object) doesn't have certain property ==> use value from default property */
      /*  reiterate: if default key in object doesn't exist (if null); */
      /*  then assign myCar with missing defaultCar's key name */
      /*  lastly, pair with value from defaultCar's key name inside of myCar's object */
      /* ex) myCar doesn't have wheels property, therefore, it will add wheels key value pair from defaultCar*/
      if(object[key] == null) object[key] = defs[key];
    }
  }
  return object;
}

*** focus on object.hasOwnProperty() part:
function defaults(object, defs) {
  for(var key in defs){
    /* why do we need .hasOwnProperty? */
    if(def.hasOwnProperty(key)) {
      if(object[key] == null) object[key] = defs[key];
    }
  }
  return object;
}

- why do we need .hasOwnProperty?
first, create prototype function dog.
> var dog = {
    bark : function () {console.log('bark);}
  };

Then, set myDog Object and link it to dog prototype method
> var myDog = Object.create(dog); /* this links dog as prototype of myDog */
/* myDog will now inherite method from dog */
> myDog.name = 'Heggy';    /* create a property on myDog */

Now, we want to only print out what properties are directly on myDog object.
** Problem: for-in loop outputs prototype linked method from dog object also.
> for (var property in myDog) {
    console.log(property);
  }
// name, bark

It also lists myDog's object prorotype along with property which is dierctly on myDog.
** Solution: object.hasOwnProperty(property) resolves this issue.
for (var property in myDog) {
  /* If stmt that checks if myDog hasOwnProperty
   to filter out its prototype property*/
  if(myDog.hasOwnProperty(property)){
    console.log(property);
  }
}

// name 

## bug fix: object[key] == null code objective: Replace values with defaults(defs) only if undefined (allows empty/zero values):
However, this requrement breake; if object[key] = null; 

Step 1: enter defaults() function in console>

function defaults(object, defs) {
		var key;
		object = object || {};
		defs = defs || {};
		/* Iterate over object non-prototype properties: */
		for (key in defs) {
			if (defs.hasOwnProperty(key)) {
				/* Replace values with defaults only if undefined (allow empty/zero values): */
				if (object[key] == null) object[key] = defs[key];
			}
		}
		return object;
}

- phase 1: 
defaults(object, defs)
defaults({}, {})

- phase 2: define object inside of argument
defaults({color: null}, {color: 'grey', wheels: 4});
// I expect first object value as null.  null means I have not yet decided.

** fix the code to be triple equals, equate it to undefine, update the oneliner to formal if stmt
before:
if (object[key] == null) object[key] = defs[key];

after:
- triple equal, replace one liner into regular if statement
if (object[key] === undefined) {
  object[key] = defs[key];
}

- final:

function defaults(object, defs) {
		var key;
		object = object || {};
		defs = defs || {};
		/* Iterate over object non-prototype properties: */
		for (key in defs) {
			if (defs.hasOwnProperty(key)) {
				/* Replace values with defaults only if undefined (allow empty/zero values): */
				if (object[key] === undefined) {
          object[key] = defs[key];
        }
			}
		}
		return object;
}

- testing final code with null to see if it extend object into default setting.
defaults({color: null}, {color: 'grey', wheels: 4});
/* {color: null, wheels: 4} */

******** AccountingJS 12: checkCurrencyFormat: ********

- checkCurrencyFormat is the last internal helper method and also gives us a good starting point to see how currency formatting works. 

Topic: string methods .match and .replace, how to structure comments, and how you can use scenario analysis to better understand code.

## 3 parts of standard format when code commenting:
1) Explanatory paragraph that provides context.
2) Parameters: (description of parameters that function expects)
3) Returns: (what gets returned at the end)

	<!-- /**
	 * *********** Before: **************
	 * Parses a format string or object and returns format obj for use in rendering
	 * 
	 * `format` is either a string with the default (positive) format, or object
	 * containing `pos` (required), `neg` and `zero` values (or a function returning
	 * either a string or object)
	 *
	 * Either string or format.pos must contain "%v" (value) to be valid
	 * 
	 * ************* After: ****************
	 * Explanatory paragraph that provides context.
	 * 
	 * Parameters: (description of parameters that function expects)
	 * string     has "default positive format", must contain "%v"
	 * object     has 'pos' (required, must contain "%v"), 'neg', 'zero' properties
	 * function   returns a string or object like above
	 * 
	 * Returns: (what gets returned at the end)
	 * object
	 */ -->


## boolean(format.match("%v"))
if format string contains value => return true

## format.replace("-", "")
if format string has "-" then replace it with blank

## Bug found checkCurrencyFormat(format):
neg : format.replace("-", "").replace("%v", "-%v)

case that want to have -- as a separator
   format.replace("-", "")
   /* it will errorenously replace separtor dash (-)*/
   .replace("%v", "-%v)
   /* now it will result to double negative infront of %v*/
'%s -- %v' ==> '%s - %v' ==> '%s - -%v'

## why bother formating negative numbers?
neg : format.replace("-", "").replace("%v", "-%v")

financial statement: negative numbers may show as this:
  (39,000.00) not -39,000.00
      (%v)


- Scenarios (input/outcome):
	 A: Valid string    ==> convert string("%s%v") to a format object ({pos/neg/zero : format})
	 B: Invalid string  ==> use default and turn it to an obj if it's not already
	 C: Valid object    ==> leave the object alone
	 D: Invalid object  ==> use default and turn it to an obj if it's not already
	 E: Function        ==> Depends on what the function returns
	 F: Nothing         ==> use default and turn it to an obj if it's not already
Note: 6 unique inputs but only 4 unique outcomes

## Video AccountingJS 13: toFixed and rounding issues:
Surprisingly, JavaScript doesn't provide a consistent way to round decimals. That's where AccountingJS's toFixed comes in. It's designed to work around the oddities of JavaScript. However, we quickly find that it's not perfect. Can we improve on AccountingJS and write something that works better?

- Looking at number.prototype.toFixed(numOfDecimalPoints)

10.265.toFixed(2) // 10.27 as expected round up
10.235.toFixed(2) // 10.23 however unexpectedly doesn't round up
10.225.toFixed(2) // 10.22 however unexpectedly doesn't round up
10.215.toFixed(2) // 10.21 however unexpectedly doesn't round up

**Conclusion: we can't rely on native method of .toFixed()

-Learn why rounding is an issue in javascript, most computer languages is to look at how
number is stored in computer memory.

Demo link to understanding storing numbers:
 - bartaz.github.io/ieee754-visualization/
 try simple ones with whole number: 2 = 2^1
 numbers are stored in powers of 2s

 - Decimal points that can't be represented with powers of 2s;
 ex) 0.615 => javaScript represents it nearlest number but bit smaller than 0.615.  
 maybe 0.6149999999999999...

- Strategy to fix this bug about rounding to 2 decimal places
.615 * 100 // 61.5
// .615 is not quite .615 but nearlest hundred will bring it to 61.5
Math.round(61.5) // 62

another ex) 10.235 * 100 (make it a whole upto 2 decimal points) , Math.round(1023.5) // 1024, 1024/100 = 10.24 
  when 10.235.toFixed(2) => output: rounded down unexpectely 10.23 (wrong)

# how does accounting.js use .toFixed() 
var power = Math.pow(10, precision);
return (Math.round(lib.unformat(value) * power) / power).toFixed(precision);

.toFixed(precision) 
- turns number into string
- adds format such as adding 0 if 3rd decimal places were requested

ex) 0.615 ==> 0.62 /* hack to round upto .62 (2 decimal places) */
    0.615 * (10^2) ==> 61.5 ==> 62 * (10^-2) ==> .62

.62.toFixed(3) /* 1) Turn number into 'string', 2) Add third decimal point holder
                *  output: "0.620" 
                */

# However, there is still a problem:
## Try following:
- 1.005 // doesn't work.
- Our current approach:  Round up at 2 decimal places: Expected result 1.005 => 1.01
   - 1.005 * 100 ==> 100.5 /* in practice we get 100.49999999999999*/
                 ==> Math.round(100.5); /* Math.round(100.49999999999999) => result 100*/
      * Prob: Not quite .5 but when multiply 100, it transforms into 100.49999999999999 
                 ==> Expected: 101 vs. Actual: 100


# in practice: moving the decimal point to right fails.
  - From 1.005 ==> 100.5 /* We want to move decimal points to the right 2 places */
  - 1.005 * 100 ==> 100.49999999999999 in real life.

## Solution to how safely move decimal points  without 
- Turn number into string and safely move the decimal points to right 2 places.
> '1.005' ==> '100.5"

- Revert to number
> Number('1.005') // output: 100.5
Next, Math.round(100.5) // outpu: 101
Finally, divide by 100 to get the 2 decimal places
> 101/100 // output: 1.01

- However, there is string manipulation and not recommended to go this route.

- Better solution's shown: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
   * Topic: Decimal rounding section in MDN
     - Understanding scientific notation
         1.005e2 // 1.005 * 10^2 ; scientific notation approach
          e: multiply exponent base 10
          2: exponent
in console: 
> 1.005e2  output: 100.5
> 1.005 * 100 output: 100.49999999999999

It is better to use scientific notation since you are getting the right number.
- 