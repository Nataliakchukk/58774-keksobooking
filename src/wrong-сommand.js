const colors = require(`colors/safe`);

module.exports = {
  name: `wrongCommand`,
  description: `Shows default text`,
  execute(command) {
    console.log(`Неизвестная команда ${colors.cyan(command)}. Чтобы прочитать правила использования приложения, наберите "--help"`);
  }
};
