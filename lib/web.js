/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "lib";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2);
	var pantazisify = __webpack_require__(6);
	var englishMapping = __webpack_require__(7);
	var document = __webpack_require__(8);
	var debounce = __webpack_require__(9);

	var inputEl = document.getElementById('input');
	var outputEl = document.getElementById('output');

	var output = null;

	var updateOutput = debounce(function () {
	  if (!output) {
	    return;
	  }

	  if (!output.output) {
	    outputEl.innerHTML = '';
	    return;
	  }

	  var map = output.characterMapping;

	  var start = inputEl.selectionStart >= map.length ? map[map.length - 1].end : map[inputEl.selectionStart].start;
	  var end = start;

	  // The user has selected a range of text
	  var isUserSelectingRange = inputEl.selectionStart < inputEl.selectionEnd;

	  // The user has a single insert caret but it falls in the middle of a replacement string
	  var isUserSelectingInMiddleOfReplacement = inputEl.selectionStart === inputEl.selectionEnd && inputEl.selectionEnd < map.length && inputEl.selectionStart > 0 && map[inputEl.selectionStart].start === map[inputEl.selectionStart - 1].start;

	  if (isUserSelectingRange) {
	    if (inputEl.selectionEnd >= map.length) {
	      // End of the whole string
	      end = map[map.length - 1].end;
	    } else if (inputEl.selectionEnd - 1 >= 0 && map[inputEl.selectionEnd].start === map[inputEl.selectionEnd - 1].end) {
	      // We ended at the boundary between to replacements
	      end = map[inputEl.selectionEnd].start;
	    } else {
	      end = map[inputEl.selectionEnd].end;
	    }
	  }
	  if (isUserSelectingInMiddleOfReplacement) {
	    end = inputEl.selectionEnd >= map.length ? map[map.length - 1].end : map[inputEl.selectionEnd].end;
	  }

	  var o = output.output.substring(0, start);
	  o += '<mark>';
	  o += output.output.substring(start, end);
	  o += '</mark>';
	  o += output.output.substring(end);

	  outputEl.innerHTML = o;
	}, 30);

	function updateSelected() {
	  setTimeout(updateOutput, 0);
	}

	function updateValue(input) {
	  output = pantazisify(input, englishMapping);
	  updateOutput();
	}

	function initalizeValue() {
	  var input = decodeURIComponent((window.location.search || '').substring(1));
	  updateValue(input);
	  inputEl.value = input;
	}

	inputEl.addEventListener('input', function (e) {
	  var input = inputEl.value;
	  updateValue(input);
	  window.history.replaceState(null, '', '?' + input);
	});

	inputEl.addEventListener('keydown', updateSelected);

	inputEl.addEventListener('mousedown', function (e) {
	  inputEl.addEventListener('mousemove', updateSelected);
	});

	inputEl.addEventListener('mouseup', function (e) {
	  inputEl.removeEventListener('mousemove', updateSelected);
	  updateSelected();
	});

	initalizeValue();

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	'use strict';

	function emojify(input, textToEmoji) {
	  var remaining = input;
	  var output = '';
	  var characterMapping = []; // input -> ouput
	  var inputPosition = 0;
	  var outputPosition = 0;

	  while (remaining.length > 0) {
	    var match = void 0;
	    var i = 0;
	    var replacementLength = 1;
	    var replacedWithLength = 1;

	    while (!match && i < textToEmoji.length) {
	      match = textToEmoji[i][0].exec(remaining);
	      i += 1;
	    }

	    if (match) {
	      i -= 1;
	      output += textToEmoji[i][2];
	      replacedWithLength = textToEmoji[i][2].length;
	      replacementLength = textToEmoji[i][1];
	    } else {
	      output += remaining.charAt(0); // TODO Add support it emojies already in source
	    }

	    var position = { start: outputPosition, end: outputPosition + replacedWithLength };
	    for (var p = 0; p < replacementLength; p += 1) {
	      characterMapping[inputPosition + p] = position;
	    }

	    remaining = remaining.substring(replacementLength);
	    inputPosition += replacementLength;
	    outputPosition += replacedWithLength;
	  }

	  return { output: output, characterMapping: characterMapping };
	}

	module.exports = emojify;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	module.exports = [[/^chocolate chip cookie/i, 21, '🍪'], [/^backseat pooper/i, 15, '💩🚽'], [/^christmas tree/i, 14, '🎄'], [/^glass of wine/i, 13, '🍷'], [/^hot chocolate/i, 13, '☕️'], [/^water closet/i, 12, '🚾'], [/^watercloset/i, 11, '🚾'], [/^nail polish/i, 11, '💅'], [/^light bulb/i, 10, '💡'], [/^wine glass/i, 10, '🍷'], [/^hahahahaha/i, 10, '😆'], [/^panda bear/i, 10, '🐼'], [/^automobile/i, 10, '🚗'], [/^thumbtack/i, 9, '📌'], [/^scapegoat/i, 9, '🐐'], [/^christmas/i, 9, '🎄'], [/^lightbulb/i, 9, '💡'], [/^hourglass/i, 9, '⏳'], [/^trademark/i, 9, '™️'], [/^chestnuts/i, 9, '🌰'], [/^palm tree/i, 9, '🌴'], [/^password/i, 8, '🙊'], [/^hahahaha/i, 8, '😆'], [/^drinking/i, 8, '🍻'], [/^calendar/i, 8, '📅'], [/^spectrum/i, 8, '🌈'], [/^computer/i, 8, '💻'], [/^espresso/i, 8, '☕️'], [/^chestnut/i, 8, '🌰'], [/^newborn/i, 7, '👶'], [/^ireland/i, 7, '🇨🇮'], [/^pushpin/i, 7, '📌'], [/^monster/i, 7, '🐲'], [/^traffic/i, 7, '🚦🚗🚗🚗🚗🚗🚗'], [/^rainbow/i, 7, '🌈'], [/^writing/i, 7, '✍️'], [/^coconut/i, 7, '🏝'], [/^t-shirt/i, 7, '👕'], [/^hot dog/i, 7, '🌭'], [/^raining/i, 7, '🌧'], [/^running/i, 7, '🏃'], [/^random/i, 6, '🔀'], [/^greece/i, 6, '🇬🇷'], [/^grease/i, 6, '🇬🇷'], [/^I need/i, 6, '😰'], [/^monkey/i, 6, '🐵'], [/^seamus/i, 6, '🌊🦄'], [/^e-mail/i, 6, '📧'], [/^repeat/i, 6, '🔁'], [/^cookie/i, 6, '🍪'], [/^laptop/i, 6, '💻'], [/^dragon/i, 6, '🐲'], [/^infant/i, 6, '👶'], [/^coffee/i, 6, '☕️'], [/^tshirt/i, 6, '👕'], [/^hotdog/i, 6, '🌭'], [/^angry/i, 5, '😡'], [/^ghost/i, 5, '👻'], [/^heart/i, 5, '❤️'], [/^clock/i, 5, '🕰'], [/^books/i, 5, '📚'], [/^shite/i, 5, '💩'], [/^light/i, 5, '💡'], [/^ too /i, 5, '❷'], [/^block/i, 5, '▆'], [/^x-mas/i, 5, '🎄'], [/^panda/i, 5, '🐼'], [/^sleep/i, 5, '💤'], [/^scene/i, 5, '🎬'], [/^ bsp /i, 5, ' 💩🚽 '], [/^knows/i, 5, '👃'], [/^write/i, 5, '✍️'], [/^email/i, 5, '📧'], [/^robot/i, 5, '🤖'], [/^mouth/i, 5, '👄'], [/^train/i, 5, '🚄'], [/^babby/i, 5, '👶'], [/^think/i, 5, '🤔'], [/^beers/i, 5, '🍻'], [/^greek/i, 5, '🇬🇷'], [/^anger/i, 5, '😡'], [/^irish/i, 5, '🇨🇮'], [/^time/i, 4, '🕰'], [/^1:00/i, 4, '🕐'], [/^palm/i, 4, '🌴'], [/^nuts/i, 4, '🌰'], [/^2:00/i, 4, '🕑'], [/^beer/i, 4, '🍺'], [/^xmas/i, 4, '🎄'], [/^3:00/i, 4, '🕒'], [/^hehe/i, 4, '😄'], [/^butt/i, 4, '🍑'], [/^4:00/i, 4, '🕓'], [/^date/i, 4, '📅'], [/^love/i, 4, '❤️'], [/^5:00/i, 4, '🕔'], [/^rain/i, 4, '🌧'], [/^haha/i, 4, '😆'], [/^6:00/i, 4, '🕕'], [/^poop/i, 4, '💩'], [/^wine/i, 4, '🍷'], [/^hour/i, 4, '⏳'], [/^ to /i, 4, '❷'], [/^back/i, 4, '🔙'], [/^okay/i, 4, '👌'], [/^ be /i, 4, ' 🐝 '], [/^soon/i, 4, '🔜'], [/^okey/i, 4, '👌'], [/^lips/i, 4, '👄'], [/^buzz/i, 4, '🐝'], [/^book/i, 4, '📗'], [/^hear/i, 4, '👂'], [/^baby/i, 4, '👶'], [/^nose/i, 4, '👃'], [/^loop/i, 4, '🔁'], [/^goat/i, 4, '🐐'], [/^ no /i, 4, '🙅'], [/^taco/i, 4, '🌮'], [/^idea/i, 4, '💡'], [/^cool/i, 4, '🆒'], [/^ear/i, 3, '👂'], [/^6pm/i, 3, '🕕pm'], [/^6am/i, 3, '🕕am'], [/^5pm/i, 3, '🕔pm'], [/^5am/i, 3, '🕔am'], [/^4pm/i, 3, '🕓pm'], [/^4am/i, 3, '🕓am'], [/^3pm/i, 3, '🕒pm'], [/^3am/i, 3, '🕒am'], [/^2pm/i, 3, '🕑pm'], [/^2am/i, 3, '🕑am'], [/^1pm/i, 3, '🕐pm'], [/^nut/i, 3, '🌰'], [/^1am/i, 3, '🕐am'], [/^eye/i, 3, '👁'], [/^tea/i, 3, '🍵'], [/^end/i, 3, '🔚'], [/^got/i, 3, '👉'], [/^on!/i, 3, '🔛'], [/^car/i, 3, '🚗'], [/^ran/i, 3, '🏃'], [/^run/i, 3, '🏃'], [/^cat/i, 3, '🐱'], [/^for/i, 3, '④'], [/^zzz/i, 3, '💤'], [/^man/i, 3, '👨'], [/^bee/i, 3, '🐝'], [/^mad/i, 3, '😡'], [/^bot/i, 3, '🤖'], [/^wc/i, 2, '🚾'], [/^ng/i, 2, '🆖'], [/^up/i, 2, '🆙'], [/^zz/i, 2, '💤'], [/^us/i, 2, '🇺🇸'], [/^ok/i, 2, '👌'], [/^tm/i, 2, '™️'], [/^on/i, 2, '🔛'], [/^t/i, 1, '🍵'], [/^i/i, 1, '👁'], [/^b/i, 1, '🐝']];

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = document;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var now = __webpack_require__(10);

	/**
	 * Returns a function, that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If `immediate` is passed, trigger the function on the
	 * leading edge, instead of the trailing.
	 *
	 * @source underscore.js
	 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
	 * @param {Function} function to wrap
	 * @param {Number} timeout in ms (`100`)
	 * @param {Boolean} whether to execute at the beginning (`false`)
	 * @api public
	 */

	module.exports = function debounce(func, wait, immediate){
	  var timeout, args, context, timestamp, result;
	  if (null == wait) wait = 100;

	  function later() {
	    var last = now() - timestamp;

	    if (last < wait && last > 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      if (!immediate) {
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      }
	    }
	  };

	  return function debounced() {
	    context = this;
	    args = arguments;
	    timestamp = now();
	    var callNow = immediate && !timeout;
	    if (!timeout) timeout = setTimeout(later, wait);
	    if (callNow) {
	      result = func.apply(context, args);
	      context = args = null;
	    }

	    return result;
	  };
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = Date.now || now

	function now() {
	    return new Date().getTime()
	}


/***/ }
/******/ ]);