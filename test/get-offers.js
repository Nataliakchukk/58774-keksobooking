const request = require(`supertest`);
const assert = require(`assert`);
const mockOffersRouter = require(`./mock-offers-router`);
const app = require(`express`)();

app.use(`/api/offers`, mockOffersRouter);

describe(`GET /api/offers`, function () {

  it(`respond with json`, () => {
    return request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const offers = response.body;
          assert.deepEqual(Object.keys(offers), [`data`, `skip`, `limit`, `total`]);
        });
  });

  it(`unknow address should responsed with 404`, () => {
    return request(app)
        .get(`/api/offerssds`)
        .set(`Accept`, `application/json`)
        .expect(404)
        .expect(`Content-Type`, /html/);
  });
});


