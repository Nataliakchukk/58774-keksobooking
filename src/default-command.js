const colors = require(`colors/safe`);
const packageInfo = require(`../package.json`);
const generateEntity = require(`./generateEntity`);

module.exports = {
  name: `defaultCommand`,
  description: `Shows default text`,
  execute() {
    generateEntity.execute();
    console.log(`Привет ${colors.rainbow(packageInfo.author)}! Эта программа будет запускать сервер «${colors.rainbow(packageInfo.name)}».`);
  }
};
