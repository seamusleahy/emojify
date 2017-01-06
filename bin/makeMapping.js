const fs = require('fs');
const path = require('path');

function convertObjectToArray(json) {
  const mapping = [];

  for (let search in json) {
    let replace = json[search];

    mapping.push([
      `/^${search}/i`,
      search.length,
      replace,
    ]);
  }

  mapping.sort((a, b) => b[1] - a[1]);

  return mapping;
}

function getJson(filename) {
  return require(path.join(__dirname, '../src/mappings/', filename));
}

function createFileContents(mapping) {
  let contents = 'module.exports = [\n';

  mapping.forEach(row => {
    contents += `  [${row[0]}, ${row[1]}, '${row[2]}'],\n`;
  });

  contents += '];\n';

  return contents;
}

function writeFile(filename, contents) {
  if (!fs.existsSync(path.join(__dirname, '../lib/mappings/'))) {
    fs.mkdirSync(path.join(__dirname, '../lib/mappings/'));
  }

  fs.writeFileSync(path.join(__dirname, '../lib/mappings/', filename), contents);
}

const fileList = fs.readdirSync(path.join(__dirname, '../src/mappings'));

fileList.forEach(filename => {
  const match = filename.match(/^(.+)\.json$/);
  if (match) {
    const json = getJson(filename);
    const mapping = convertObjectToArray(json);
    const mappingFileContents = createFileContents(mapping);
    writeFile(match[1] + '.js', mappingFileContents);
  }
});




