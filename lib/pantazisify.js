function emojify(input, textToEmoji) {
  let remaining = input;
  let output = '';
  const characterMapping = []; // input -> ouput
  let inputPosition = 0;
  let outputPosition = 0;

  while (remaining.length > 0) {
    let match;
    let i = 0;
    let replacementLength = 1;

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

    const position = { start: outputPosition, end: outputPosition + 1 };
    for (let p = 0; p < replacementLength; p += 1) {
      characterMapping[inputPosition + p] = position;
    }

    remaining = remaining.substring(replacementLength);
    inputPosition += replacementLength;
    outputPosition += 1;
  }

  return { output, characterMapping };
}

module.exports = emojify;
