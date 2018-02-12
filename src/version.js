const colors = require(`colors/safe`);
const packageInfo = require(`../package.json`);

const array = packageInfo.version.split(`.`);
module.exports = {
  name: `version`,
  description: `— печатает версию приложения;`,
  execute() {
    console.log(`v${colors.red(array[0])}.${colors.green(array[1])}.${colors.blue(array[2])}`);
  }
};
