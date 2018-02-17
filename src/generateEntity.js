const {generateEntity} = require(`../src/generator/wizards-generator`);
const fs = require(`fs`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);

const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
const data = generateEntity();

module.exports = {
  name: `generateEntity`,
  description: `Generates data for project`,
  execute(filePath = `${process.cwd()}/wizards-data.json`) {
    return writeFile(filePath, JSON.stringify(data), fileWriteOptions);
  }
};
