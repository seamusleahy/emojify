'use strict';

require('./web.css');
const pantazisify = require('./pantazisify');
const englishMapping = require('../lib/mappings/english');
const document = require('document');
const debounce = require('debounce');

const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');

let output = null;

const updateOutput = debounce(function() {
  if (!output) {
    return;
  }

  const map = output.characterMapping;

  const start = inputEl.selectionStart >= map.length ?
    map[map.length - 1].end :
    map[inputEl.selectionStart].start;
  let end = start;

  // The user has selected a range of text
  const isUserSelectingRange = inputEl.selectionStart < inputEl.selectionEnd;

  // The user has a single insert caret but it falls in the middle of a replacement string
  const isUserSelectingInMiddleOfReplacement = (inputEl.selectionStart === inputEl.selectionEnd
  && inputEl.selectionEnd < map.length
  && inputEl.selectionStart > 0
  && map[inputEl.selectionStart].start === map[inputEl.selectionStart - 1].start);

  if (isUserSelectingRange) {
    if (inputEl.selectionEnd >= map.length) {
      // End of the whole string
      end = map[map.length - 1].end;
    } else if (inputEl.selectionEnd - 1 >= 0
      && map[inputEl.selectionEnd].start === map[inputEl.selectionEnd - 1].end) {
      // We ended at the boundary between to replacements
      end = map[inputEl.selectionEnd].start;
    } else {
      end = map[inputEl.selectionEnd].end;
    }
  }
  if (isUserSelectingInMiddleOfReplacement) {
    end = inputEl.selectionEnd >= map.length ?
      map[map.length - 1].end :
      map[inputEl.selectionEnd].end;
  }

  let o = output.output.substring(0, start);
  o += '<mark>';
  o += output.output.substring(start, end);
  o += '</mark>';
  o += output.output.substring(end);

  outputEl.innerHTML = o;
}, 30);

function updateSelected() {
  setTimeout(updateOutput, 0);
}

inputEl.addEventListener('input', e => {
  const input = inputEl.value;
  output = pantazisify(input, englishMapping);
  updateOutput();
});

inputEl.addEventListener('keydown', updateSelected);

inputEl.addEventListener('mousedown', e => {
  inputEl.addEventListener('mousemove', updateSelected);
});

inputEl.addEventListener('mouseup', e => {
  inputEl.removeEventListener('mousemove', updateSelected);
  updateSelected();
});
