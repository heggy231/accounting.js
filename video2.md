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

Video 2) 
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