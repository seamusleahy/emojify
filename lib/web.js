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

	var inputEl = document.getElementById('input');
	var outputEl = document.getElementById('output');

	inputEl.addEventListener('input', function (e) {
	  var input = inputEl.value;
	  var output = pantazisify(input, englishMapping);
	  outputEl.innerHTML = output.output;
	});

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

	    while (!match && i < textToEmoji.length) {
	      match = textToEmoji[i][0].exec(remaining);
	      i += 1;
	    }

	    if (match) {
	      i -= 1;
	      output += textToEmoji[i][2];
	      replacementLength = textToEmoji[i][1];
	    } else {
	      output += remaining.charAt(0); // TODO Add support it emojies already in source
	    }

	    var position = { start: outputPosition, end: outputPosition + 1 };
	    for (var p = 0; p < replacementLength; p += 1) {
	      characterMapping[inputPosition + p] = position;
	    }

	    remaining = remaining.substring(replacementLength);
	    inputPosition += replacementLength;
	    outputPosition += 1;
	  }

	  return { output: output, characterMapping: characterMapping };
	}

	module.exports = emojify;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	module.exports = [[/^chocolate chip cookie/i, 21, '🍪'], [/^glass of wine/i, 13, '🍷'], [/^light bulb/i, 10, '💡'], [/^hahahahaha/i, 10, '😆'], [/^wine glass/i, 10, '🍷'], [/^lightbulb/i, 9, '💡'], [/^hahahaha/i, 8, '😆'], [/^drinking/i, 8, '🍻'], [/^calendar/i, 8, '📅'], [/^computer/i, 8, '💻'], [/^hot dog/i, 7, '🌭'], [/^monkey/i, 6, '🐵'], [/^cookie/i, 6, '🍪'], [/^hotdog/i, 6, '🌭'], [/^laptop/i, 6, '💻'], [/^train/i, 5, '🚄'], [/^sleep/i, 5, '💤'], [/^ghost/i, 5, '👻'], [/^knows/i, 5, '👃'], [/^block/i, 5, '▆'], [/^beers/i, 5, '🍻'], [/^shite/i, 5, '💩'], [/^light/i, 5, '💡'], [/^taco/i, 4, '🌮'], [/^date/i, 4, '📅'], [/^idea/i, 4, '💡'], [/^beer/i, 4, '🍺'], [/^wine/i, 4, '🍷'], [/^nose/i, 4, '👃'], [/^butt/i, 4, '🍑'], [/^okey/i, 4, '👌'], [/^poop/i, 4, '💩'], [/^okay/i, 4, '👌'], [/^haha/i, 4, '😆'], [/^tea/i, 3, '🍵'], [/^man/i, 3, '👨'], [/^eye/i, 3, '👁'], [/^cat/i, 3, '🐱'], [/^ok/i, 2, '👌'], [/^us/i, 2, '🇺🇸'], [/^up/i, 2, '🆙'], [/^i/i, 1, '👁'], [/^t/i, 1, '🍵']];

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = document;

/***/ }
/******/ ]);