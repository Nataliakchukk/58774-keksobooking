const generateCommand = require(`../src/generateEntity`);
const {generateEntity} = require(`../src/generator/wizards-generator`);
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

describe(`Generate arrey`, () => {
  const data = generateEntity();
  it(`should find author`, () => {
    assert.ok(`author` in data);
    assert.equal(typeof data.author, `object`);
  });
  it(`should find avatar in author`, () => {
    assert.ok(`avatar` in data.author);
    assert.equal(typeof data.author.avatar, `string`);
  });
  it(`should find offer`, () => {
    assert.ok(`offer` in data);
    assert.equal(typeof data.offer, `object`);
  });
  it(`should find title in offer`, () => {
    assert.ok(`title` in data.offer);
    assert.equal(typeof data.offer.title, `string`);
  });
  it(`should find address in offer`, () => {
    assert.ok(`address` in data.offer);
    assert.equal(typeof data.offer.address, `string`);
  });
  it(`should find price in offer`, () => {
    assert.ok(`price` in data.offer);
    assert.equal(typeof data.offer.price, `number`);
  });
  it(`should find type in offer`, () => {
    assert.ok(`type` in data.offer);
    assert.equal(typeof data.offer.type, `string`);
  });
  it(`should find rooms in offer`, () => {
    assert.ok(`rooms` in data.offer);
    assert.equal(typeof data.offer.rooms, `number`);
  });
  it(`should find guests in offer`, () => {
    assert.ok(`guests` in data.offer);
    assert.equal(typeof data.offer.guests, `number`);
  });
  it(`should find checkin in offer`, () => {
    assert.ok(`checkin` in data.offer);
    assert.equal(typeof data.offer.checkin, `string`);
  });
  it(`should find checkout in offer`, () => {
    assert.ok(`checkout` in data.offer);
    assert.equal(typeof data.offer.checkout, `string`);
  });
  it(`should find features in offer`, () => {
    assert.ok(`features` in data.offer);
    assert.equal(typeof data.offer.features, `string`);
  });
  it(`should find description in offer`, () => {
    assert.ok(`description` in data.offer);
    assert.equal(typeof data.offer.description, `string`);
  });
  it(`should find photos in offer`, () => {
    assert.ok(`photos` in data.offer);
    assert.equal(typeof data.offer.photos, `object`);
  });
  it(`should find location in offer`, () => {
    assert.ok(`location` in data.offer);
    assert.equal(typeof data.offer.location, `object`);
  });
});
