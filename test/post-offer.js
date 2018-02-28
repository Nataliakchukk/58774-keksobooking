const request = require(`supertest`);
const {app} = require(`../src/server`);

describe(`POST /api/offers`, function () {

  it(`should consume JSON`, () => {
    return request(app).post(`/api/offers`).
        send({
          author: {
            avatar: `test/fixtures/test.jpg`,
          },
          location: {
            x: 565.0488536141017,
            y: 335.1362499791128,
          },
          offer: {
            title: `Маленький ужасный дворец`,
            address: `565.0488536141017, 335.1362499791128`,
            checkin: `12:00`,
            checkout: `14:00`,
            description: ``,
            features: [`wifi`, `dishwasher`, `parkin`, `washer`, `elevator`, `conditioner`],
            guests: 3,
            photos: [
              `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
              `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
              `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
            ],
            price: 545130,
            rooms: 3,
            type: `flat`,
          }
        }).
        expect(200, {
          author: {
            avatar: `test/fixtures/test.jpg`,
          },
          location: {
            x: 565.0488536141017,
            y: 335.1362499791128,
          },
          offer: {
            title: `Маленький ужасный дворец`,
            address: `565.0488536141017, 335.1362499791128`,
            checkin: `12:00`,
            checkout: `14:00`,
            description: ``,
            features: [`wifi`, `dishwasher`, `parkin`, `washer`, `elevator`, `conditioner`],
            guests: 3,
            photos: [
              `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
              `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
              `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
            ],
            price: 545130,
            rooms: 3,
            type: `flat`,
          }
        });
  });

  it(`should consume form data`, () => {
    return request(app).post(`/api/offers`).
        field(`title`, `Маленький ужасный дворец`).
        field(`address`, `565.0488536141017, 335.1362499791128`).
        field(`checkin`, `12:00`).
        field(`checkout`, `14:00`).
        field(`description`, ``).
        field(`features`, [`wifi`, `dishwasher`, `parkin`, `washer`, `elevator`, `conditioner`]).
        field(`guests`, `3`).
        field(`price`, 545130).
        field(`rooms`, 3).
        field(`type`, `flat`).
        attach(`avatar`, `test/fixtures/test.jpg`).
        expect(200, {
          title: `Маленький ужасный дворец`,
          address: `565.0488536141017, 335.1362499791128`,
          checkin: `12:00`,
          checkout: `14:00`,
          description: ``,
          features: [`wifi`, `dishwasher`, `parkin`, `washer`, `elevator`, `conditioner`],
          guests: `3`,
          price: `545130`,
          rooms: `3`,
          type: `flat`,
        });
  });

  it(`should fail if title is invalid`, () => {
    return request(app).post(`/api/offers`).
        field(`title`, `Г`).
        field(`address`, `565.0488536141017, 335.1362499791128`).
        field(`checkin`, `12:00`).
        field(`checkout`, `14:00`).
        field(`description`, ``).
        field(`features`, [`wifi`, `dishwasher`, `parkin`, `washer`, `elevator`, `conditioner`]).
        field(`guests`, `3`).
        field(`price`, 545130).
        field(`rooms`, 3).
        field(`type`, `flat`).
        attach(`avatar`, `test/fixtures/test.jpg`).
        expect(400, [{
          fieldName: `username`,
          fieldValue: `Г`,
          errorMessage: `should be in range 30..140`
        }]);
  });

  it(`should fail if address is invalid`, () => {
    return request(app).post(`/api/offers`).
        field(`title`, `Маленький ужасный дворец`).
        field(`address`, ``).
        field(`checkin`, `12:00`).
        field(`checkout`, `14:00`).
        field(`description`, ``).
        field(`features`, [`wifi`, `dishwasher`, `parkin`, `washer`, `elevator`, `conditioner`]).
        field(`guests`, `3`).
        field(`price`, 545130).
        field(`rooms`, 3).
        field(`type`, `flat`).
        attach(`avatar`, `test/fixtures/test.jpg`).
        expect(400, [{
          fieldName: `address`,
          fieldValue: ``,
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
        field(`features`, [`wifi`, `dishwasher`, `parkin`, `washer`, `elevator`, `conditioner`]).
        field(`guests`, `3`).
        field(`price`, 545130).
        field(`rooms`, 3).
        field(`type`, `flat`).
        attach(`avatar`, `test/fixtures/test.jpg`).
        expect(400, [{
          fieldName: `checkin`,
          fieldValue: `0`,
          errorMessage: `should be formatt HH:mm`
        }]);
  });

  it(`should fail if checkout is invalid`, () => {
    return request(app).post(`/api/offers`).
        field(`title`, `Маленький ужасный дворец`).
        field(`address`, `99`).
        field(`checkin`, `14:00`).
        field(`checkout`, `0`).
        field(`description`, ``).
        field(`features`, [`wifi`, `dishwasher`, `parkin`, `washer`, `elevator`, `conditioner`]).
        field(`guests`, `3`).
        field(`price`, 545130).
        field(`rooms`, 3).
        field(`type`, `flat`).
        attach(`avatar`, `test/fixtures/test.jpg`).
        expect(400, [{
          fieldName: `checkout`,
          fieldValue: `0`,
          errorMessage: `should be formatt HH:mm`
        }]);
  });

  it(`should fail if rooms is invalid`, () => {
    return request(app).post(`/api/offers`).
        field(`title`, `Маленький ужасный дворец`).
        field(`address`, `99`).
        field(`checkin`, `14:00`).
        field(`checkout`, `14:00`).
        field(`description`, ``).
        field(`features`, [`wifi`, `dishwasher`, `parkin`, `washer`, `elevator`, `conditioner`]).
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
