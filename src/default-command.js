const fs = require(`fs`);
const colors = require(`colors/safe`);
const packageInfo = require(`../package.json`);
const {generateEntity} = require(`../src/generator/wizards-generator`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);
const readline = require('readline');
const open = util.promisify(fs.open);


const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = util.promisify(function(quest, callback) {
  rl.question(quest, callback.bind(null, null));
});

const setData = (count, filePath) => {
  let dataArrey = [];
  while (count > 0) {
    dataArrey.push(generateEntity());
    count--;
  };
  writeFile(filePath, JSON.stringify(dataArrey), fileWriteOptions)
};

const setFilePath = (filePath, count) => {
  return open(filePath, `wx`)
    .then(() => {
      return setData(count, filePath)
        .then(() => {
          console.log(`Файл записан`);
          rl.close();
          process.exit(0);
      });
    })
    .catch((pathError) => {
      if(pathError) {
        if(pathError.code === `EEXIST`) {
          return question(`Файл уже есть, перезаписать? [yes/no]: `)
            then((rewriteFile) => {
              if (rewriteFile !== `yes`) {
                console.log(`Файл остался прежним`);
                rl.close();
                process.exit(0);
              }
            return setData(count, filePath)
              .then(() => {
                console.log(`Файл перезаписан`);
                rl.close();
                process.exit(0);
              });
          });
        }
      }
    });
};

module.exports = {
  name: `defaultCommand`,
  description: `Shows default text`,
  execute() {
    console.log(`Привет ${packageInfo.author}! Эта программа будет запускать сервер «${packageInfo.name}».`);
    question(`Сколько объектов сформировать? `)
      .then((count) => {
        return question(`Укажите путь, где сохранить данные: `)
          .then((filePath) => {
            setFilePath(filePath, count);
        });
      });
  }
};
