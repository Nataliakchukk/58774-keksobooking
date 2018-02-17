const generateCommand = require(`../src/generateEntity`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const access = promisify(fs.access);
const unlink = promisify(fs.unlink);
const assert = require(`assert`);


describe(`Generate JSON command`, function () {
  it(`should fail on not existing folder`, function () {
    const tempFileName = `${__dirname}/folder/testfile.json`;
    return generateCommand.execute(tempFileName)
        .then(() => assert.fail(`Path ${tempFileName} should not be available`))
        .catch((e) => assert.ok(e));
  });

  it(`should create new file`, function () {
    const templFileName = `${__dirname}/testfile.json`;
    return generateCommand.execute(templFileName)
        .then(() => access(templFileName))
        .then(() => unlink(templFileName));
  });
});

// describe(`Generate JSON command`, function() {
//   const templFaleName = `${__dirname}/testfile.json`;
//   return generateCommand.execute(templFaleName)
//     .then(() =>)
//
// })
// describe(`Array`, () => {
//   describe(`#indexOf()`, () => {
//     it(`should return -1 when the value is not present`, () => {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });
