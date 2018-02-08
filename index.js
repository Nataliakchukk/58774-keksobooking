const args = process.argv.slice(2);
if (args.length > 0) {
   switch (args[0]) {
      case `--help`:
        console.log(`Доступные команды:
--help    — печатает этот текст;
--version — печатает версию приложения;`);
        break;
      case `--version`:
        console.log(`version 1.2.3`);
        break;
      default:
        console.log(`Неизвестная команда ${args[0]} Чтобы прочитать правила использования приложения, наберите "--help"`);
        process.exit(1);
    };
} else {
    console.log(`Привет Nadya! Эта программа будет запускать сервер «Кексобукинг».`);
}
