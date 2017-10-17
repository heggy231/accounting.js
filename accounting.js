/*!
 * accounting.js v0.4.2
 * Copyright 2014 Open Exchange Rates
 *
 * Freely distributable under the MIT license.
 * Portions of accounting.js are inspired or borrowed from underscore.js
 *
 * Full details and documentation:
 * http://openexchangerates.github.io/accounting.js/
 */

(function(root, undefined) {

	/* --- Setup --- */

	// Create the local library object, to be exported or referenced globally later
	var lib = {};

	// Current version
	lib.version = '0.4.1';


	/* --- Exposed settings --- */

	// The library's settings configuration object. Contains default parameters for
	// currency and number formatting
	lib.settings = {
		currency: {
			symbol : "$",		// default currency symbol is '$'
			format : "%s%v",	// controls output: %s = symbol, %v = value (can be object, see docs)
												/* $10 => "%s%v", 10USD => "%v%s", 10 USD => "%v %s" */
			decimal : ".",		// decimal point separator
			thousand : ",",		// thousands separator
			precision : 2,		// decimal places
			grouping : 3		// digit grouping (not implemented yet)
		},
		number: {
			precision : 0,		// default precision on numbers is 0
			grouping : 3,		// digit grouping (not implemented yet)
			thousand : ",",
			decimal : "."
		}
	};


	/* --- Internal Helper Methods --- */

	// Store reference to possibly-available ECMAScript 5 methods for later
	var nativeMap = Array.prototype.map,
		nativeIsArray = Array.isArray,
		toString = Object.prototype.toString;

	/**
	 * Tests whether supplied parameter is a string
	 * from underscore.js
	 */
	function isString(obj) {
		// force ( what is inside ) result as corresponding boolean value
		// obj.charCodeAt & obj.substr are availabe methods in string and proves obj is string.
		// explicitly say empty string should pass isString test
		return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
	}

	/**
	 * Tests whether supplied parameter is an array (fixed type is a string to an array)
	 * from underscore.js, delegates to ECMA5's native Array.isArray
	 */

	// native javascript method on Array Array.isArray([]) in console, result: T/F
	// nativeIsArray is defined above under Store reference section. 

	function isArray(obj) {
		return nativeIsArray ? nativeIsArray(obj) : toString.call(obj) === '[object Array]';
	}

	/**
	 * Tests whether supplied parameter is a true object (true object as not array but {object})
	 */
	// toString = Object.prototype.toString; Object.prototype.toString.call(obj)
	function isObject(obj) {
		return obj && toString.call(obj) === '[object Object]';
	}

	/**
	 * Extends an object with a defaults object, similar to underscore's _.defaults
	 *
	 * Used for abstracting parameter handling from API methods
	 */
	function defaults(object, defs) {
		var key;
		// Truthy/Falsy checking object/defs are true then keep it
		//  otherwise make it {}
		object = object || {};
		defs = defs || {};
		// Iterate over object non-prototype properties:
		//  loop thru each key in defs obj
		for (key in defs) {
			// check only property directly assigned to defs
			//  if we didn't use .hasOwnProperty(key), it'll include the prototype methods
			if (defs.hasOwnProperty(key)) {
				// Replace values with defaults only if undefined (allow empty/zero values):
				//  if any property(key) is missing (null) in object compare to defs key will be assgined
 				//  with defs value.  There is a problem with this code which I fixed with === undefined.
				if (object[key] == null) object[key] = defs[key];
			}
		}
		return object;
	}

	/**
	 * Implementation of `Array.map()` for iteration loops
	 *
	 * Returns a new Array as a result of calling `iterator` on each array value.
	 * Defers to native Array.map if available
	 */
	function map(obj, iterator, context) {
		/* var results = [];
		 * var i;
		 * var j;
		 */
		var results = [], i, j;

		if (!obj) return results;

		// Use native .map method if it exists and obj has map method on it
		/* iterator callback, context is optional this
		   nativeMap = Array.prototype.map;
		*/
		if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);

		// Fallback for native .map:
		/* If native .map doesn't exist */
		/* From TDD we create map function; see the similarity 
		    function map (origialArray, callback, optionalThis) {
					var mapCallback = callback;

					if (optionalThis) {
						mapCallback = callback.bind(optionalThis);
					}

					for (var i = 0; i < originalArray.length; i++) {
						mapCallback(originalArray[i], i, originalArray);
					}
				}
		*/
		for (i = 0, j = obj.length; i < j; i++ ) {
			results[i] = iterator.call(context, obj[i], i, obj);
		}
		return results;
	}

	/**
	 * Check and normalise the value of precision (must be positive integer)
	 */
	/* checkPrecision checks for valid number of decimal point, Precision is num decimal point
	    in your currency.  base is default value; if val is not valid then it will revert to base
	*/
	function checkPrecision(val, base) {
		/* num of decimal has to be positve number
			  absoluteValue(val) and must be integer (no 1/2 of decimal) 
			 Math.round() in case user inputs decimal.
			*/
		val = Math.round(Math.abs(val));
		/* isNotANumber(val) returns true => throw val away; return base 
		    else val isANumber =>
		*/
		return isNaN(val)? base : val;
	}


	/**
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
	 * Parameters: (description of parameters that function expects) format
	 *  string     has "default positive format", must contain "%v"
	 *  object     has 'pos' (required, must contain "%v"), 'neg', 'zero' properties
	 *  function   returns a string or object like above
	 * 
	 * Returns: (what gets returned at the end)
	 *  object     has 'pos' (required, must contain "%v"), 'neg', 'zero' properties
	 *              this requirement is shown in checkCurrencyFormat(format)
	 */
	/* lib.settings.currency.format: "%s%v" 
	 *  controls output format: %s = symbol, %v = value (can be object, see docs)
	 *   ex) $10 => "%s%v" which is default value
	 */

	 // Scenarios (input/outcome):
	 // A: Valid string    ==> convert string("%s%v") to a format object ({pos/neg/zero : format})
	 // B: Invalid string  ==> use default and turn it to an obj if it's not already
	 // C: Valid object    ==> leave the object alone
	 // D: Invalid object  ==> use default and turn it to an obj if it's not already
	 // E: Function        ==> Depends on what the function returns
	 // F: Nothing         ==> use default and turn it to an obj if it's not already
	 //  Note: 6 unique inputs but only 4 unique outcomes

	/* *******  usecase: checkCurrencyFormat gets used in later par of the function. *********
	 * Check format (returns object with pos, neg and zero):
	 *  formats = checkCurrencyFormat(opts.format),
	 *
	 * Choose which format to use for this value:
	 *  useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero;
	 * 
	 */

	function checkCurrencyFormat(format) {
		/* Default value => "%s%v" to start. */
		var defaults = lib.settings.currency.format;  

		// Allow function as format parameter (should return string or object):
		//  if format is function that run it as format.
		if ( typeof format === "function" ) format = format();

		// if format is string, in which case `value` ("%v") must be present:
		// 'heggy'.match('h') ==> ['h']
		// 'heggy'.match('a') ==> null
		// Does format string contain '%v' ('value') in it? if format matches %v => true
		//  corresponding boolean value for null is false

		// argument passed in (format) isString and contains %v value
		// value must be present but symbol is optional
		if ( isString( format ) && format.match("%v") ) {

			// Create and return positive, negative and zero formats:
			// function has to return an object
			return {
				// positive and zero numbers will have same format
				pos : format, /* positive */
				// First, .replace("-", ""): 
				// if you have dash to start '%s - %v' ==> '%s %v' 
				//  if val already has neg sign replace delete to avoid double negative sign in case '%s - -%v' happen
				// Bug: it could be you want double dash, '%s -- %v' ==> '%s - %v' ==> '%s - -%v'
				// Second,  .replace("%v", "-%v"): find %v replace with -%v
				neg : format.replace("-", "").replace("%v", "-%v"),
				zero : format /* zero to have different format dash (-) or no value */
			};

		// If no format, or object is missing valid positive value, use defaults:
		} else if ( !format || !format.pos || !format.pos.match("%v") ) {

			// If defaults is a string, casts it to an object for faster checking next time:
			//  return default object
			// If defaults NOT string ==> return defaults (lib.settings.currency.format = "%s%v")
			// If default is string; lib.settings.currency.format set to object {}.
			// lib.settings.currency.format initially string but here we have it return it as obj {}
			//  second time we run it and we have to return defaults object again,
			//    !isString( defaults ) is true default was set to obj first time.
			//    we can return object immediately; instead of creating new object
			return ( !isString( defaults ) ) ? defaults : lib.settings.currency.format = {
				pos : defaults,
				neg : defaults.replace("%v", "-%v"),
				zero : defaults
			};

		}
		// Otherwise, assume format was fine:
		// if not a string; format is object >> return format
		return format;
	}


	/* --- API Methods --- */
	/* API methods is for users of the accountingJS use */

	/**
	 * Takes a string/array of strings, removes all formatting/cruft and returns the raw float value
	 * Alias: `accounting.parse(string)`
	 *
	 * Decimal must be included in the regular expression to match floats (defaults to
	 * accounting.settings.number.decimal), so if the number uses a non-standard decimal 
	 * separator, provide it as the second argument.
	 *
	 * Also matches bracketed negatives (eg. "$ (1.99)" => -1.99)
	 *
	 * Doesn't throw any errors (`NaN`s become 0) but this may change in future
	 */
	var unformat = lib.unformat = lib.parse = function(value, decimal) {
		// Recursively unformat arrays:
		if (isArray(value)) {
			return map(value, function(val) {
				return unformat(val, decimal);
			});
		}

		// Fails silently (need decent errors):
		value = value || 0;

		// Return the value as-is if it's already a number:
		if (typeof value === "number") return value;

		// Default decimal point comes from settings, but could be set to eg. "," in opts:
		decimal = decimal || lib.settings.number.decimal;

		 // Build regex to strip out everything except digits, decimal point and minus sign:
		var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
			unformatted = parseFloat(
				("" + value)
				.replace(/\((.*)\)/, "-$1") // replace bracketed values with negatives
				.replace(regex, '')         // strip out any cruft
				.replace(decimal, '.')      // make sure decimal point is standard
			);

		// This will fail silently which may cause trouble, let's wait and see:
		return !isNaN(unformatted) ? unformatted : 0;
	};


	/**
	 * Implementation of toFixed() that treats floats more like decimals
	 *
	 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
	 * problems for accounting- and finance-related software.
	 */
	/* currency precision by (lib.settings = currency: {precision: 2} => 2 decimal places, */
	/* number precision by (lib.settings = number: {precision: 0} since normal number doesn't need decimal places */
	var toFixed = lib.toFixed = function(value, precision) {
		/* if you provide precision it will be set as that; otherwise default number precision 0*/
		precision = checkPrecision(precision, lib.settings.number.precision);
		/* **** understand what power is doing *****
		 * .615 * (10^2) ==> 61.5 ==> 62 ==> .62
		 * power is base 10 with power of precision which is exponent (this ex: 2 exponent
		 * 
		 * 10^2 in javascript Math.pow(10, 2)
		 */
		var power = Math.pow(10, precision);

		// Multiply up by precision, round accurately, then divide and use native toFixed():
		//  lib.unformat(value) strip any formatting of value ex: currency, commas
		//  power 100 (with precision = 2)
		// First, multiply by power to make it a whole number then divide to the desired decimal place
		// Last, turn number into string add format (adding 3rd decimal zero) using .toFixed()
		return (Math.round(lib.unformat(value) * power) / power).toFixed(precision);
	};

	// More accurate toFixed funtion with scientific notation to express decimal point manipulation
	function betterToFixed(value, precision) {
		// model to work off from 1.005e2 (2 number of precision)
		var exponentialForm = Number(value + 'e' + precision); /* Number ("1.005e2" string)*/
		var rounded = Math.round(exponentialForm);
		                  /* Number('101e-2') ==> first it's string -> convert to number */
		var finalResult = Number(rounded + 'e-' + precision);
		            /* Number.toFixed(noOfSignificance) is native method*/
		return finalResult.toFixed(precision);
	}


	/**
	 * Format a number, with comma-separated thousands and custom precision/decimal places
	 * Alias: `accounting.format()`
	 *
	 * Localise by overriding the precision and thousand / decimal separators
	 * 2nd parameter `precision` can be an object matching `settings.number`
	 */

	// formatNumber related to formatMoney; formatNumber prop
	//  on lib object (now can be used as method on lib obj)
	// lib.format is just shortcut var; not recommended
	// Just like formatMoney second param can be obj if not want to list
  //  out in the order starting precision, thousand, decimal
	var formatNumber = lib.formatNumber = lib.format = function(number, precision, thousand, decimal) {
		// Resursively format arrays:
		if (isArray(number)) {
			return map(number, function(val) {
				return formatNumber(val, precision, thousand, decimal);
			});
		}

		// Clean up number:
		// Clean up number: e.g. $1.99 ==> 1.99, (2.3) ==> -2.3
		number = unformat(number);

		// Build options object from second param (if object) or all params, extending defaults:
		// if second param is obj then it will accept as obj in following
		var opts = defaults(
				(isObject(precision) ? precision : {
					precision : precision,
					thousand : thousand,
					decimal : decimal
				}),
				lib.settings.number
			),

			// Clean up precision 
			// Internal Helper method which checks for input being valid
			usePrecision = checkPrecision(opts.precision),

			// Do some calc:
			// neg sign prefixing to the string, returned result look below 
			//  read: if number less than 0, have neg sign otherwise, nothing
			negative = number < 0 ? "-" : "",
			
			// number = -10  
			//  negative => neg sign
			//  base => 10, doesn't include neg sign nor decimal
			// number = -10.2, base: 10
			// number = 10.2, base: 10 
// Main purpose of below line of code is parse out only the base.
// base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + "" 

			// Start with inner-most function call
			//  1. Math.abs(number || 0)
			//      Math.abs(number) returns pos form of number
			// 			(number || 0) if number =undefined/null => default to 0
			//			 however, this may cause issue later not recommeded if pass in somthing that is broken; it shouldn't work!  Defaulting it 0 may seem like it works and causes problems in your program

			// 2. toFixed(), takes in number, show how many decimals to show (we are using usePrecision for that)
			//      second argmt usePrecision default zero unless you overwrite it.
      //      returns that number in string
			// 3. Lets say we got back '10.20' from toFixed
			//    ParseInt('10.20', 10) <= my argument 1 is base 10 number (we typically use this format)
			//    ParseInt('10.20', 2) <= binary number
			//    ParseInt('10.20', 10) <= parse integer out of string

			// in summaray, parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) ignore, sign and decimal points and returns base part only (returns 10 from -10.20).

			// + "" <= adding empty string will convert/coerce value into string
			base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + "",

			// mod stands for modulo

			// base.length |  mod
			// =====================
			//    1-3      |   0     // base.length => 3; default mod = 0
			//     4       |   1     // base.length => 4;     4%3 mod = 1
			//     5       |   2	 	 // base.length => 5; 		5%3 mod = 2
			//     6       |   0		 // base.length => 6;			6%3 mod = 0
			//     7       |   1		 // base.length => 7;			7%3 mod = 1
			//     8       |   2		 // base.length => 8;			8%3 mod = 2
			//     9       |   0
			//     10      |   1
			//     11      |   2

			mod = base.length > 3 ? base.length % 3 : 0;

// assumption: all number is postive for simplicity
			// base.length |  mod  |   base         |   result   |
			// =================================================== 
			//    1-3      |   0   |   '100'        |  '' + '' + '100' + ''    = '100'
			//     4       |   1   |   '1000'       |  '' + '1,' + '000' + ''  = '1,000'
			//     5       |   2	 |   '10000'      |  '' + '10,' + '000' + '' = '10,000'
			//     6       |   0	 |   '100000.12'  |  '' + '' + '100,' + (opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1])

			//     7       |   1		practice rest pos, neg, decimal points
			//     8       |   2		// number =  100000.12
			//     9       |   0		// base   = '100000' remember base
			//     10      |   1
			//     11      |   2

		// Format the number:
		// negtive is defined above if number is pos add nothing vs '-'
		return negative 
// boolean value of mod, just try out !!mod or Boolean(mod) in console
// '1000'.sustr(0, mod)
// opts.thousand defaults ","
// "1000".substr(0, 1) from string start at i=0 and grab 1 character => "1"
			+ (mod ? base.substr(0, mod) + opts.thousand : "") 

// '100'.substr(0) => start at 0 position give me str => '100'
// .replace(/(\d{3})(?=\d)/g => digit metaCharacter (\d) consecutive 3 digits 
//  {3}: quantifier, how many consecutive digits? 3
//  It is wrapped in parenthesis (): capture group, (\d{3})
// positive lookAhead (?=\d), match the previous pattern followed by digit, (/d)
// if there is no match it will just return the str number ('100') with no change made

// opt.thousand = , by default
			+ base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand) 

// usePrecision defaults 0, falsy => go to else stmt => return ""
/*
* rewrite ternary operator to regular if/else
*  usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : ""
* 
* if(usePrecision === false) {
*   return opts.decimal + toFixed( Math.abs(number), usePrecision ).split('.')[1];
* } else {
*		return "";
* }
*/
			+ (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : "");
	};


	/**
	 * Format a number into currency
	 *
	 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
	 * Following defaults from lib.settings{} top of the file
	 * defaults: (0, "$", 2, ",", ".", "%s%v")
	 * 
	 * to see above defaults: go up file > lib.settings={
	 *   currency: { symbol: format: decimal, thousand: precision
	 *   }
	 * }
	 * 
	 * Localise by overriding the symbol, precision, thousand / decimal separators and format
	 * Second param can be an object matching `settings.currency` which is the easiest way.
	 *
	 * To do: tidy up the parameters
	 */

	 /* attaching .formatMoney as a property of lib object.  This is only way users have access to formatMoney
	  */
	var formatMoney = lib.formatMoney = function(number, symbol, precision, thousand, decimal, format) {
		// Recursively format arrays:
		if (isArray(number)) {
			return map(number, function(val){
				return formatMoney(val, symbol, precision, thousand, decimal, format);
			});
		}

		// Clean up number:
		// strips out any extra characters in case you input string for value, extracts only number value
		//  ex: accounting.formatMoney('1 USD') => $1.00
		// Note: number is argument that has been passed in.
		number = unformat(number);

		// Build options object from second param (if object) or all params, extending defaults: 
		//  extending defaults means overriding or customizing them
		// defaults is part of internal helper method; exisiting default object lib.settings.currency
		//  Lets you selectively override specific features by putting it right order of 
		//   formatMondy(number, symbol, precision, thousand, decimal, format) or using object with prop specified 
		//    ex {key:value}

    // var opts, formats, useFormat; are getting declare using 435 var.  this is bad form.
		var opts = defaults(
			// Check second argmt symbol see if it is object; true => pass symbol as object overwrite defaults
			//  otherwise, build customized object by grabbing values from your input and insert into the value part of obj
			//  function(number, symbol, precision, thousand, decimal, format) => key : value (your input)
				(isObject(symbol) ? symbol : {
					symbol : symbol,
					precision : precision,
					thousand : thousand,
					decimal : decimal,
					format : format
				}),
				// if you don't specify anything > leave it as default internal helper method
				lib.settings.currency
		);

		// Check format (returns object with pos, neg and zero):
		var formats = checkCurrencyFormat(opts.format);


 /* **** this is rewrite of terninary operator useFormat *****
	*		var useFormat; // first declare with out giving a value
	*   
	*   if (number > 0) {
	*     useFormat = formats.pos;
	*   } else if (number < 0) {
  *     useFormat = formats.neg;
	*	  // number is zero
	*   } else { 
	* 	  useFormat = formats.zero;
	*		}
  */
		// Choose which format to use for this value:
		var useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero;

		/* ** better reading eventhough it is longer ***
		 * var formattedNumber = formatNumber(
		 *  Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal);
		 * 
     * var finalResult = useFormat
		 * 	.replace('%s', opts.symbol)
		 * 	.replace('%v', formattedNumber);
		 * 
		 * return finalResult;
     */


		// Return with currency symbol added:
		//  .replace() returns mutated string each time, you can chain method calls together
		return useFormat.replace('%s', opts.symbol)
		                .replace('%v', formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal));

		
	};


	/**
	 * Format a list of numbers into an accounting column, padding with whitespace
	 * to line up currency symbols, thousand separators and decimals places
	 *
	 * List should be an array of numbers
	 * Second parameter can be an object containing keys that match the params
	 *
	 * Returns array of accouting-formatted number strings of same length
	 *
	 * NB: `white-space:pre` CSS rule is required on the list container to prevent
	 * browsers from collapsing the whitespace in the output strings.
	 */
	lib.formatColumn = function(list, symbol, precision, thousand, decimal, format) {
		if (!list) return [];

		// Build options object from second param (if object) or all params, extending defaults:
		var opts = defaults(
				(isObject(symbol) ? symbol : {
					symbol : symbol,
					precision : precision,
					thousand : thousand,
					decimal : decimal,
					format : format
				}),
				lib.settings.currency
			),

			// Check format (returns object with pos, neg and zero), only need pos for now:
			formats = checkCurrencyFormat(opts.format),

			// Whether to pad at start of string or after currency symbol:
			padAfterSymbol = formats.pos.indexOf("%s") < formats.pos.indexOf("%v") ? true : false,

			// Store value for the length of the longest string in the column:
			maxLength = 0,

			// Format the list according to options, store the length of the longest string:
			formatted = map(list, function(val, i) {
				if (isArray(val)) {
					// Recursively format columns if list is a multi-dimensional array:
					return lib.formatColumn(val, opts);
				} else {
					// Clean up the value
					val = unformat(val);

					// Choose which format to use for this value (pos, neg or zero):
					var useFormat = val > 0 ? formats.pos : val < 0 ? formats.neg : formats.zero,

						// Format this value, push into formatted list and save the length:
						fVal = useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(val), checkPrecision(opts.precision), opts.thousand, opts.decimal));

					if (fVal.length > maxLength) maxLength = fVal.length;
					return fVal;
				}
			});

		// Pad each number in the list and send back the column of numbers:
		return map(formatted, function(val, i) {
			// Only if this is a string (not a nested array, which would have already been padded):
			if (isString(val) && val.length < maxLength) {
				// Depending on symbol position, pad after symbol or at index 0:
				return padAfterSymbol ? val.replace(opts.symbol, opts.symbol+(new Array(maxLength - val.length + 1).join(" "))) : (new Array(maxLength - val.length + 1).join(" ")) + val;
			}
			return val;
		});
	};


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

		// My approach which is similar to underscore.
		// var oldAccounting = root.accounting; // root = window
		// lib.noConflict = function(){
		// 	root.accounting = oldAccounting;
		// 	return lib;
		// }


		// root = window since this is the first argument of function(root, undefined)
		// Declare `fx` on the root (global/window) object:
		root['accounting'] = lib;
	}

	// Root will be `window` in browser or `global` on the server:
}(this));
