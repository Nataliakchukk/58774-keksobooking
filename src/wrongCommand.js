const packageInfo = require(`../package.json`);

module.exports = {
  name: `default`,
  description: `Shows default text`,
  execute() {
    console.log(`Неизвестная команда ${packageInfo.name}. Чтобы прочитать правила использования приложения, наберите "--help"`);
  }
};
