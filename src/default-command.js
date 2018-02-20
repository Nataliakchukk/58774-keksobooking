const fs = require(`fs`);
const packageInfo = require(`../package.json`);
const {generateEntity} = require(`../src/generator/wizards-generator`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);
const readline = require(`readline`);
const access = util.promisify(fs.access);


const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (quest) => new Promise((resolve) => rl.question(quest, resolve));

const setData = util.promisify(function (count, filePath, callback) {
  let dataArrey = [];
  while (count > 0) {
    dataArrey.push(generateEntity());
    count--;
  }
  writeFile(filePath, JSON.stringify(dataArrey), fileWriteOptions)
      .then(() => {
        callback();
      });
});

const setFilePath = (filePath, count) => {
  access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      setData(count, filePath)
          .then(() => {
            console.log(`Файл записан`);
            rl.close();
          });
    } else {
      question(`Файл уже есть, перезаписать? [yes/no]: `)
          .then((rewriteFile) => {
            if (rewriteFile !== `yes`) {
              console.log(`Файл остался прежним`);
              rl.close();
            } else {
              setData(count, filePath)
                  .then(() => {
                    console.log(`Файл перезаписан`);
                    rl.close();
                  });
            }
          });
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
          if (parseInt(count, 10)) {
            question(`Укажите путь, где сохранить данные: `)
                .then((filePath) => {
                  setFilePath(filePath, count);
                });
          } else {
            console.log(`вы ввели не число`);
            process.exit(1);
          }
        });
  }
};
