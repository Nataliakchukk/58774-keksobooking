const colors = require(`colors/safe`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `defaultCommand`,
  description: `Shows default text`,
  execute() {
    console.log(`Привет ${colors.trap(packageInfo.author)}! Эта программа будет запускать сервер «${colors.rainbow(packageInfo.name)}».`);
  }
};
