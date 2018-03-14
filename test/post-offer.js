const request = require(`supertest`);
const mockOffersRouter = require(`./mock-offers-router`);
const app = require(`express`)();

app.use(`/api/offers`, mockOffersRouter);

const testDate = Date.now();

describe(`POST /api/offers`, () => {

  it(`should consume JSON`, () => {
    return request(app).post(`/api/offers`).
        send({
          title: `Маленький ужасный грязный дворец`,
          address: `565.0488536141017, 335.1362499791128`,
          description: ``,
          price: 545130,
          type: `flat`,
          rooms: 3,
          guests: 3,
          checkin: `12:00`,
          checkout: `14:00`,
          features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
          date: testDate
        }).
        expect(200, {
          title: `Маленький ужасный грязный дворец`,
          address: `565.0488536141017, 335.1362499791128`,
          checkin: `12:00`,
          checkout: `14:00`,
          description: ``,
          features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
          guests: 3,
          price: 545130,
          rooms: 3,
          type: `flat`,
          date: testDate
        });
  });

  it(`should consume form data`, () => {
    return request(app).post(`/api/offers`).
        field(`title`, `Маленький ужасный дворец`).
        field(`address`, `565.0488536141017, 335.1362499791128`).
        field(`checkin`, `12:00`).
        field(`checkout`, `14:00`).
        field(`description`, ``).
        field(`features`, [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`]).
        field(`guests`, `3`).
        field(`price`, 545130).
        field(`rooms`, 3).
        field(`type`, `flat`).
        field(`date`, testDate).
        expect(200, {
          title: `Маленький ужасный дворец`,
          address: `565.0488536141017, 335.1362499791128`,
          checkin: `12:00`,
          checkout: `14:00`,
          description: ``,
          features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
          guests: 3,
          price: 545130,
          rooms: 3,
          type: `flat`,
          date: testDate,
        });
  });

  it(`should consume form data + avatar`, () => {
    return request(app).post(`/api/offers`).
        field(`title`, `Маленький ужасный дворец`).
        field(`address`, `565.0488536141017, 335.1362499791128`).
        field(`checkin`, `12:00`).
        field(`checkout`, `14:00`).
        field(`description`, ``).
        field(`features`, [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`]).
        field(`guests`, `3`).
        field(`price`, 545130).
        field(`rooms`, 3).
        field(`type`, `flat`).
        field(`date`, testDate).
        attach(`avatar`, `test/fixtures/test.jpg`).
        expect(200, {
          title: `Маленький ужасный дворец`,
          address: `565.0488536141017, 335.1362499791128`,
          checkin: `12:00`,
          checkout: `14:00`,
          description: ``,
          features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
          guests: 3,
          price: 545130,
          rooms: 3,
          type: `flat`,
          date: testDate,
          avatar: {
            path: `api/offers/${testDate}/avatar`,
            mimetype: `image/jpeg`
          }
        });
  });

  it(`should fail if title is invalid`, () => {
    return request(app).post(`/api/offers`).
        field(`title`, `U`).
        field(`address`, `565.0488536141017, 335.1362499791128`).
        field(`checkin`, `12:00`).
        field(`checkout`, `14:00`).
        field(`description`, ``).
        field(`features`, [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`]).
        field(`guests`, `3`).
        field(`price`, 545130).
        field(`rooms`, 3).
        field(`type`, `flat`).
        expect(400, [{
          fieldName: `title`,
          fieldValue: `U`,
          errorMessage: `should be in range 20..140`
        }]);
  });

  it(`should fail if address is invalid`, () => {
    return request(app).post(`/api/offers`).
        field(`title`, `Маленький ужасный дворец`).
        field(`address`, `1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111`).
        field(`checkin`, `12:00`).
        field(`checkout`, `14:00`).
        field(`description`, ``).
        field(`features`, [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`]).
        field(`guests`, `3`).
        field(`price`, 545130).
        field(`rooms`, 3).
        field(`type`, `flat`).
        attach(`avatar`, `test/fixtures/test.jpg`).
        expect(400, [{
          fieldName: `address`,
          fieldValue: `1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111`,
          errorMessage: `should be in range 1..100`
        }]);
  });
  it(`should fail if checkin is invalid`, () => {
    return request(app).post(`/api/offers`).
        field(`title`, `Маленький ужасный дворец`).
        field(`address`, `99`).
        field(`checkin`, `0`).
        field(`checkout`, `14:00`).
        field(`description`, ``).
        field(`features`, [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`]).
        field(`guests`, `3`).
        field(`price`, 545130).
        field(`rooms`, 3).
        field(`type`, `flat`).
        attach(`avatar`, `test/fixtures/test.jpg`).
        expect(400, [{
          fieldName: `checkin`,
          fieldValue: `0`,
          errorMessage: `should be one of [12:00,13:00,14:00]`
        }]);
  });

  it(`should fail if checkout is invalid`, () => {
    return request(app).post(`/api/offers`).
        field(`title`, `Маленький ужасный дворец`).
        field(`address`, `99`).
        field(`checkin`, `14:00`).
        field(`checkout`, `0`).
        field(`description`, ``).
        field(`features`, [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`]).
        field(`guests`, `3`).
        field(`price`, 545130).
        field(`rooms`, 3).
        field(`type`, `flat`).
        attach(`avatar`, `test/fixtures/test.jpg`).
        expect(400, [{
          fieldName: `checkout`,
          fieldValue: `0`,
          errorMessage: `should be one of [12:00,13:00,14:00]`
        }]);
  });

  it(`should fail if rooms is invalid`, () => {
    return request(app).post(`/api/offers`).
        field(`title`, `Маленький ужасный дворец`).
        field(`address`, `99`).
        field(`checkin`, `14:00`).
        field(`checkout`, `14:00`).
        field(`description`, ``).
        field(`features`, [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`]).
        field(`guests`, `3`).
        field(`price`, 545130).
        field(`rooms`, -1).
        field(`type`, `flat`).
        attach(`avatar`, `test/fixtures/test.jpg`).
        expect(400, [{
          fieldName: `rooms`,
          fieldValue: `-1`,
          errorMessage: `should be in range 1..1000`
        }]);
  });

});
