const packageInfo = require(`../package.json`);
const version = require(`./version`);
const help = require(`./help`);
const wrongCommand = require(`./wrongCommand`);
const description = require(`./description`);
const author = require(`./author`);
const license = require(`./license`);

module.exports = {
  '--help': () => help.execute(),
  '--license': () => license.execute(),
  '--description': () => description.execute(),
  '--author': () => author.execute(),
  '--version': () => version.execute(),
  'defaultCommand': (arg) => {
    wrongCommand.execute(arg);
    process.exit(1);
  },
  'empty': () => {
    console.log(`Привет ${packageInfo.author}! Эта программа будет запускать сервер «${packageInfo.name}».`);
  },
};
