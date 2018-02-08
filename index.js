const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter commands name [--version, --help] ', (answer) => {
  switch (answer) {
    case '--version':
      console.log('version 1.2.3');
      break;
    case '--help':
      console.log('help: print info.');
      break;
    case '':
      console.log('your answer is empty');
      break;
    default:
      console.log(`error: your answer ${answer} is not good, try again`)

  }
  rl.close();
});
