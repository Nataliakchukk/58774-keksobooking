const {generateEntity} = require(`../src/generator/wizards-generator`);
const fs = require(`fs`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);
const readline = require('readline');

const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

const question = util.promisify((quest, callback) => {
  rl.question(quest, callback.bind(null, null));
})
module.exports = {
  name: `generateEntity`,
  description: `Generates data for project`,
  execute(number, path) {
    const setData = (number, path) => {
      let dataArrey = [];
      while (number > 0) {
         dataArrey.push(generateEntity());
         number--;
      };
      writeFile(path, JSON.stringify(dataArrey), fileWriteOptions);
    };
  }
};
