const createOffersRouter = require(`../src/server/offers/router`);
const generate = require(`./offers-generator`);

const offers = [...new Array(5)].map(() => generate.generateEntity());

class Cursor {
  constructor(data) {
    this.data = data;
  }

  skip(count) {
    return new Cursor(this.data.slice(count));
  }

  limit(count) {
    return new Cursor(this.data.slice(0, count));
  }

  async count() {
    return this.data.length;
  }

  async toArray() {
    return this.data;
  }
}

class MockOfferStore {
  constructor() {
  }

  async getOffer(offerDate) {
    return offers.find((it) => it.date === offerDate);
  }

  async getAllOffers() {
    return new Cursor(offers);
  }

  async save() {
  }

}

class MockImageStore {

  async getBucket() {
  }

  async get() {
  }

  async save() {
  }

}

module.exports = createOffersRouter(new MockOfferStore(), new MockImageStore());

