const colors = require(`colors/safe`);

const version = require(`./version`);
const description = require(`./description`);
const author = require(`./author`);
const license = require(`./license`);

module.exports = {
  name: `help`,
  description: ` — печатает этот текст;`,
  execute() {
    console.log(`Доступные команды: 
      --${colors.grey(this.name)} ${colors.green(this.description)}
      --${colors.grey(license.name)} ${colors.green(license.description)}
      --${colors.grey(version.name)} ${colors.green(version.description)}
      --${colors.grey(description.name)} ${colors.green(description.description)}
      --${colors.grey(author.name)} ${colors.green(author.description)}`);
  }
};
