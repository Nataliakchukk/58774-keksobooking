const fs = require(`fs`);
const colors = require(`colors/safe`);
const packageInfo = require(`../package.json`);
const generateEntity = require(`./generateEntity`);
const readline = require('readline');

module.exports = {
  name: `defaultCommand`,
  description: `Shows default text`,
  execute() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    console.log(`Привет ${colors.rainbow(packageInfo.author)}! Эта программа будет запускать сервер «${colors.rainbow(packageInfo.name)}».`);
    rl.question(`Сколько объектов недвижимости нужно создать? `, (count) => {
      rl.question(`Укажите путь, куда сохранять данные? `, (path) => {
        const filePath = path && path.indexOf(`.json`) !== -1 ? path : `${process.cwd()}/wizards-data.json`;
        fs.readFile(filePath, (err, data) => {
          if (err) {
            rl.question(`Файл ${filePath} уже существует, перезаписать?`, (answer) => {
              if (answer === `yes`) {
                console.log(`файл перезаписался`);
                generateEntity.execute(count, filePath);
              } else {
                console.log(`файл остался прежним`);
              }
              rl.close();
            });
          } else {
            generateEntity.execute(count, filePath);
            rl.close();
          }
          rl.close();
        });
      });
    });
  }
};
