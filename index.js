const args = process.argv.slice(2);
const arreyValueProcess = process.argv[1].split(`/`);
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
    };
} else {
    console.log(`Привет ${arreyValueProcess[2]}! Эта программа будет запускать сервер «${arreyValueProcess[3]}».`);
    process.exit(1);
}
