const version = require(`./version`);
const help = require(`./help`);
const wrongCommand = require(`./wrong-сommand`);
const description = require(`./description`);
const author = require(`./author`);
const defaultCommand = require(`./default-command`);
const license = require(`./license`);
const server = require(`./server`);

module.exports = {
  [`--${help.name}`]: () => help.execute(),
  [`--${license.name}`]: () => license.execute(),
  [`--${description.name}`]: () => description.execute(),
  [`--${author.name}`]: () => author.execute(),
  [`--${version.name}`]: () => version.execute(),
  [`--${server.name}`]: (arg) => server.execute(arg),
  [`--${defaultCommand.name}`]: () => defaultCommand.execute(),
  'defaultCommand': (arg) => server.execute(arg),
  'wrongCommand': (arg) => {
    wrongCommand.execute(arg);
    process.exit(1);
  },
};
