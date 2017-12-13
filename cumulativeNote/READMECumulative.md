# Ternary operator (https://watchandcode.com/courses/77710/lectures/2296260)
@ 11:21

  * formula: conditional ? (if condition is true) : conditional2 ? (else if condition2 is true) : (else default case)

  ex) accounting.js ternary operator
  ```javascript
  // Choose which format to use for this value:
    var useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero;

  // 1st, it will check first set right before colon;
  // Is it greater than zero? then format.pos otherwise, if not: Go to next set
  column number > 0 ? formats.pos

  // is it less than zero? then format.neg, if not: Go to next set
  number < 0 ? formats.neg

  // else, it must be zero
  formats.zero
  ```

  - Better way to write this statement:

  ```javascript
  var useFormat; // not yet give it a value

  if (number > 0) {
    useFormat = formats.pos;
  } else if (number < 0) {
    useFormat = formats.neg;
  } else {
    useFormat = formats.zero;
  }
  ```

  ex) another ex from Udacity on ternary operator for if...else stmt.

  - conditional ? (if condition is true) : (if condition is false)
  ```javascript
  var isGoing = true;
  var color = isGoing ? "green" : "red";
  console.log(color);
  // output: "green"
  ```

  - rewrite to if...else
  ```javascript
  var isGoing = true;
  var color;
  if(isGoing) {
    color = "green";
  } else {
    color = "red";
  }
  console.log(color);
  ```

- Challenge advance level ternary operator:
```javascript

//ex ternary operator invoking function 
var sayHello = function () {
  console.log('Hello!');
}

var sayBye = function () {
  console.log('Bye!');
}

var friend = false;
friend ? sayHello() : sayBye();
// output bye

//ex ternary operator if..else if
var age = 20;
var personType;

if (age > 17) {
  personType = 'Adult';
} else if (age > 12) {
  personType = 'Teen';
} else {
  personType = 'Kid';
}

// ternary operator rewrite
personType = age > 17 ? 'Adult' : age > 12 ? 'Teen' : 'Kid';


// make it more readable
personType = age > 17 ? 'Adult' : 
             age > 12 ? 'Teen' : 
             'Kid';
console.log(personType); 

// one example where Ternary operation is not encouraged.
age = 20;
var isAdult;

if (age > 17) {
  isAdult = true;
} else {
  isAdult = false;
}

isAdult = age > 17 ? true : false; // only makes the code complex
isAdult = age > 17; // this is better by coersion it will assign only when true.
// Note: when you have a variable assisgnmenet t/f no need ternary nor if/else

// if there is user Action > process that action otherwise, defaultAction
var action = userAction ? userAction : defaultAction;
var action = userAction || defaultAction; // OR operation is more easy to undertand

// if..else
var action;
if (userAction) {
  action = userAction;
} else {
  action = defaultAction;
}
```
* resource: https://www.youtube.com/watch?v=0l-jPBVoARY

```javascript
/*
 * Programming Quiz - Navigating the Food Chain (3-8)
 *
 * Use a series of ternary operator to set the category to one of the following:
 *   - "herbivore" if an animal eats plants
 *   - "carnivore" if an animal eats animals
 *   - "omnivore" if an animal eats plants and animals
 *   - undefined if an animal doesn't eat plants or animals
 *
 * Notes
 *   - use the variables `eatsPlants` and `eatsAnimals` in your ternary expressions
 *   - `if` statements aren't allowed ;-)
 */

// change the values of `eatsPlants` and `eatsAnimals` to test your code
var eatsPlants = true;
var eatsAnimals = true;
var category = eatsPlants && eatsAnimals ? "omnivore" :
               eatsPlants ? "herbivore" :
               eatsAnimals ? "carnivore" :
               undefined;
```
# Switch statement

When do you use switch statement?  repeating else...if stmt in your code, where each code is based on the same value, > use switch statement.

```javascript
var option = 3;

if (option === 1) {
  console.log("You selected option 1.");
} else if (option === 2) {
  console.log("You selected option 2.");
} else if (option === 3) {
  console.log("You selected option 3.");
} else if (option === 4) {
  console.log("You selected option 4.");
} else if (option === 5) {
  console.log("You selected option 5.");
} else if (option === 6) {
  console.log("You selected option 6.");
}

// convert to switch statement
var option = 3;
switch (option) {
  case 1: 
    console.log("You selected option 1.");
    break;
  case 2: 
    console.log("You selected option 2.");
    break;
  case 3:
    console.log("You selected option 3.");
    break;
  case 4:
    console.log("You selected option 4.");
    break;
  case 5: 
    console.log("You selected option 5.");
    break;
  case 6:
    console.log("You selected option 6.");
    break; // last case 6 break is not neccessary
}
// for switch statement it is important to break; otherwise, fallthru happens
//  where after case 3 > keeps running until the end.

// quiz
var month = 2;

switch(month) {
  case 1:
  case 3:
  case 5:
  case 7:
  case 8:
  case 10:
  case 12:
    days = 31;
    break;
  case 4:
  case 6:
  case 9:
  case 11:
    days = 30;
    break;
  case 2:
    days = 28;
}

console.log("There are " + days + " days in this month.");
//28 days
```

- use case for 'falling-through' behavior for switch statement with no break
* fun card game refer:
https://www.kickstarter.com/projects/elanlee/exploding-kittens/description

```javascript
var tier = "deck of legends";
var output = "You'll receive ";

switch (tier) {
  case "deck of legends":
    output += "a custom card, ";
  case "collector's deck":
    output += "a signed version of the Exploding Kittens deck, ";
  case "nfsw deck":
    output += "one copy of the NFSW Exploding Kittens card game and ";
  default:
    output += "one copy of the Exploding Kitten card game.";
}

console.log(output);
// You'll receive a custom card, a signed version of the Exploding Kittens deck, one copy of the NFSW Exploding Kittens card game and one copy of the Exploding Kitten card game.
```

## Challenge: If winner = 3?  
```javascript
var prize = "";

switch (winner) {
  case 1:
    prize += "a trip for two to the Bahamas and ";
  case 2:
    prize += "a four piece furniture set.";
    break;
  case 3:
    prize += "a smartwatch and ";
  default:
    prize += "tickets to the circus.";
}

console.log("You've won " + prize);
// smart watch, tickets to circus
```

# Intro to Loops:
## While loops
- lab: while loops
```javascript
var x = 1;
while (x <= 10000) {
  console.log(x + " mississippi!");
  x = x + 1; //x++
}
```

  - Parts of While Loop
    1) When to start: The code that sets up the loop - defining the starting value of variable for instance.
    2) When to stop: The logical condition to test whether the loop should continue.
    3) How to get to the next item: The incrementing or decrementing step - ex) `x = x * 3`
        or `x = x - 1`
