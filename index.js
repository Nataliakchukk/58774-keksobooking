const userCommand = require(`./src/user-command`);

const args = process.argv.slice(2);

if (args.length > 0) {
  if (userCommand[args[0]]) {
    userCommand[args[0]](args.slice(1));
  } else {
    userCommand.wrongCommand(args[0]);
  }
} else {
  userCommand.defaultCommand();
}
