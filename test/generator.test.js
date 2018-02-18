const generateCommand = require(`../src/generateEntity`);
const {generateEntity} = require(`../src/generator/wizards-generator`);
const data = require(`../src/data`);
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
  const generator = generateEntity();
  it(`should find author`, () => {
    assert.ok(`author` in generator);
    assert.equal(typeof generator.author, `object`);
  });

  it(`should find avatar in author`, () => {
    assert.ok(`avatar` in generator.author);
    const avatar = generator.author.avatar;
    assert.equal(typeof avatar, `string`);
    assert.equal(avatar.indexOf(`https://robohash.org/`), 0);
  });

  it(`should find offer`, () => {
    assert.ok(`offer` in generator);
    assert.equal(typeof generator.offer, `object`);
  });

  it(`should find title in offer`, () => {
    assert.ok(`title` in generator.offer);
    const title = generator.offer.title;
    assert.equal(typeof title, `string`);
    assert.equal(data.TITLE.indexOf(title) !== -1, true);
  });

  it(`should find address in offer`, () => {
    assert.ok(`address` in generator.offer);
    const address = generator.offer.address;
    assert.equal(typeof address, `string`);
    const arrayAddress = address.split(`,`);
    assert.equal(arrayAddress[1], generator.location.x);
    assert.equal(arrayAddress[1], generator.location.y);
  });

  it(`should find price in offer`, () => {
    assert.ok(`price` in generator.offer);
    const price = generator.offer.price;
    assert.equal(typeof price, `number`);
    assert.equal(+price > 1000 && +price < 1000000, true);
  });

  it(`should find type in offer`, () => {
    assert.ok(`type` in generator.offer);
    const type = generator.offer.type;
    assert.equal(typeof type, `string`);
    assert.equal(data.TYPE.indexOf(type) !== -1, true);
  });

  it(`should find rooms in offer`, () => {
    assert.ok(`rooms` in generator.offer);
    const rooms = generator.offer.rooms;
    assert.equal(typeof rooms, `number`);
    assert.equal(+rooms >= 1 && +rooms <= 5, true);
  });

  it(`should find guests in offer`, () => {
    assert.ok(`guests` in generator.offer);
    assert.equal(typeof generator.offer.guests, `number`);
  });

  it(`should find checkin in offer`, () => {
    assert.ok(`checkin` in generator.offer);
    const checkin = generator.offer.checkin;
    assert.equal(typeof checkin, `string`);
    assert.equal(data.TIME.indexOf(checkin) !== -1, true);
  });

  it(`should find checkout in offer`, () => {
    assert.ok(`checkout` in generator.offer);
    const checkout = generator.offer.checkout;
    assert.equal(typeof checkout, `string`);
    assert.equal(data.TIME.indexOf(checkout) !== -1, true);
  });

  it(`should find features in offer`, () => {
    assert.ok(`features` in generator.offer);
    const features = generator.offer.features;
    assert.equal(typeof features, `object`);
    for (let i = 0; i < features.length; i++) {
      assert.ok(data.FEATURES.indexOf(features[i]) !== -1);
      let array = features.splice(i, 1);
      assert.ok(array.indexOf(features[i]) === -1);
    }
  });

  it(`should find description in offer`, () => {
    assert.ok(`description` in generator.offer);
    assert.equal(typeof generator.offer.description, `string`);
  });

  it(`should find photos in offer`, () => {
    assert.ok(`photos` in generator.offer);
    const photo = generator.offer.photos;
    assert.equal(typeof photo, `object`);
    for (let i = 0; i < photo.length; i++) {
      assert.ok(data.PHOTOS.indexOf(photo[i]) !== -1);
    }
  });

  it(`should find location`, () => {
    assert.ok(`location` in generator);
    const location = generator.location;
    assert.equal(typeof location, `object`);
    assert.equal(typeof location.x, `number`);
    assert.equal(typeof location.y, `number`);
    assert.equal(location.x >= 300 && location.x <= 900, true);
    assert.equal(location.y >= 150 && location.y <= 500, true);
  });
});
