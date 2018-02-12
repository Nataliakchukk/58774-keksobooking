const packageInfo = require(`../package.json`);

module.exports = {
  name: `defaultCommand`,
  description: `Shows default text`,
  execute() {
    console.log(`Привет ${packageInfo.author}! Эта программа будет запускать сервер «${packageInfo.name}».`);
  }
};
