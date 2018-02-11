const packageInfo = require(`./package.json`);
const {execute: version} = require(`./src/version`);
const {execute: help} = require(`./src/help`);
const {execute: wrongCommand} = require(`./src/wrongCommand`);
const {execute: description} = require(`./src/description`);
const {execute: author} = require(`./src/author`);
const {execute: license} = require(`./src/license`);

const args = process.argv.slice(2);
if (args.length > 0) {
  switch (args[0]) {
    case `--help`:
      help();
      break;
    case `--license`:
      license();
      break;
    case `--description`:
      description();
      break;
    case `--author`:
      author();
      break;
    case `--version`:
      version();
      break;
    default:
      wrongCommand();
      process.exit(1);
  }
} else {
  console.log(`Привет ${packageInfo.author}! Эта программа будет запускать сервер «${packageInfo.name}».`);
}
