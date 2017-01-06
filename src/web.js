'use strict';

require('./web.css');
const pantazisify = require('./pantazisify');
const englishMapping = require('../lib/mappings/english');
const document = require('document');

const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');

inputEl.addEventListener('input', e => {
  const input = inputEl.value;
  const output = pantazisify(input, englishMapping);
  outputEl.innerHTML = output.output;
});
        