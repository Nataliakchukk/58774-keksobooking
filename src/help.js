module.exports = {
  name: `help`,
  description: `Shows commands`,
  execute() {
    console.log(`Доступные команды:
      --help    — печатает этот текст;
      --license    — печатает тип лицензии;
      --author    — печатает имя атора;
      --description    — печатает описание модуля;
      --version — печатает версию приложения;`);
  }
};
