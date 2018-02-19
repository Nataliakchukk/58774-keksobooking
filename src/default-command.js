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
    rl.question('Сколько объектов недвижимости нужно создать? ', (count) => {
      rl.question('Укажите путь, куда сохранять данные? ', (path) => {
        generateEntity.execute(count, path);
        rl.close();
      });
    });
  }
};
