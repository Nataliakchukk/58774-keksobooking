const args = process.argv.slice(2);
if (process.argv.length > 2) {
   switch (args[0]) {
      case `--help`:
        console.log(`печатает этот текст`);
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
