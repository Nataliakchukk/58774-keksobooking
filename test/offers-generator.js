const data = require(`../src/data`);


const getRandomFromArr = (arr) => arr[Math.floor(arr.length * Math.random())];

const getMixItem = (item) => item.filter(() => Math.random() > 0.25);

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

const generateEntity = () => {
  const location = {
    'x': getRandomArbitrary(300, 900),
    'y': getRandomArbitrary(150, 500),
  };
  return {
    'author': {
      'avatar': `https://robohash.org/${getRandomFromArr([1, 2, 3, 4, 5, 6, 7])}?set=set4`
    },
    'offer': {
      'title': getRandomFromArr(data.TITLE),
      'address': [location.x, location.y].join(`, `),
      'price': Math.round(getRandomArbitrary(1000, 1000000)),
      'type': getRandomFromArr(data.TYPE),
      'rooms': Math.round(getRandomArbitrary(1, 5)),
      'guests': Math.round(getRandomArbitrary(1, 5)),
      'checkin': getRandomFromArr(data.TIME),
      'checkout': getRandomFromArr(data.TIME),
      'features': getMixItem(data.FEATURES),
      'description': ``,
      'photos': getMixItem(data.PHOTOS),
    },
    'location': location
  };
};

module.exports = {
  generateEntity
};
