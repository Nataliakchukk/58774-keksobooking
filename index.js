const userCommand = require(`./src/userCommand`);

const args = process.argv.slice(2);

if (args.length > 0) {
  if (userCommand[args[0]]) {
    userCommand[args[0]]();
  } else {
    userCommand.defaultCommand(args[0]);
  }
} else {
  userCommand.empty();
}
