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