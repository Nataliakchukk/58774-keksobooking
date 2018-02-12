const colors = require(`colors/safe`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `description`,
  description: ` — печатает описание модуля;`,
  execute() {
    console.log(`Описание модуля: ${colors.inverse(packageInfo.description)}.`);
  }
};
