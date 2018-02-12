const packageInfo = require(`./package.json`);
const version = require(`./src/version`);
const help = require(`./src/help`);
const wrongCommand = require(`./src/wrongCommand`);
const description = require(`./src/description`);
const author = require(`./src/author`);
const license = require(`./src/license`);

const args = process.argv.slice(2);
if (args.length > 0) {
  switch (args[0]) {
    case `${help.name}`:
      help.execute();
      break;
    case `${license.name}`:
      license.execute();
      break;
    case `${description.name}`:
      description.execute();
      break;
    case `${author.name}`:
      author.execute();
      break;
    case `${version.name}`:
      version.execute();
      break;
    default:
      wrongCommand.execute();
      process.exit(1);
  }
} else {
  console.log(`Привет ${packageInfo.author}! Эта программа будет запускать сервер «${packageInfo.name}».`);
}
