const {generateEntity} = require(`../src/generator/wizards-generator`);
const fs = require(`fs`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);
const readline = require('readline');

const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

module.exports = {
  name: `generateEntity`,
  description: `Generates data for project`,
  execute(count, path) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    const filePath = path && path.indexOf(`.json`) !== -1 ? path : `${process.cwd()}/wizards-data.json`;
    const countData = count && typeof +count === `number`? count : 1;
    const setData = (number, path) => {
      let dataArrey = [];
      while (number > 0) {
         dataArrey.push(generateEntity());
         number--;
      };
      return dataArrey;
      writeFile(path, JSON.stringify(dataArrey), fileWriteOptions);
    };
    const refreshData = (count) => {
      if (count === `yes`) {
        console.log(`файл перезаписался`);
        setData(countData, filePath);
      } else {
        console.log(`файл остался прежним`);
      }
    };

    fs.readFile(filePath, (err, data) => {
      if (err) {
        rl.question(`Файл ${filePath} уже существует, перезаписать?`, (answer) => {
          refreshData(answer);
        });
      }
    });
  }
};
