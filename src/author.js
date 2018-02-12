const colors = require(`colors/safe`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `author`,
  description: `— печатает имя атора`,
  execute() {
    console.log(`Автор модуля ${colors.red(packageInfo.author)}.`);
  }
};
