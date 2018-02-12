module.exports = {
  name: `wrongCommand`,
  description: `Shows default text`,
  execute(command) {
    console.log(`Неизвестная команда ${command}. Чтобы прочитать правила использования приложения, наберите "--help"`);
  }
};
