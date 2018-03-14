const fs = require(`fs`);
const packageInfo = require(`../package.json`);
const {generateEntity} = require(`../test/offers-generator`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);
const readline = require(`readline`);
const access = util.promisify(fs.access);


const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

const setData = util.promisify((count, filePath, callback) => {
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

module.exports = {
  name: `data`,
  description: `Shows default text`,
  execute() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const setFilePath = (filePath, count) => {
      access(filePath, fs.constants.W_OK)
          .then(() => {
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
          })
          .catch(() => {
            setData(count, filePath)
                .then(() => {
                  console.log(`Файл записан`);
                  rl.close();
                });
          });
    };

    const question = (quest) => new Promise((resolve) => rl.question(quest, resolve));

    console.log(`Привет ${packageInfo.author}! Эта программа будет запускать сервер «${packageInfo.name}». `);
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
