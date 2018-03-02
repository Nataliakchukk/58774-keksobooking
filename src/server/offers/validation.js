const {textRange, isImage, oneOf, anyOf, inRange} = require(`../util/assertion`);
const data = require(`../../data`);

const MAX_TITLE_LENGTH = 140;
const MIN_TITLE_LENGTH = 20;
const MAX_PRICE_LENGTH = 1000000;
const MIN_PRICE_LENGTH = 1;
const MAX_ADDRESS_LENGTH = 100;
const MIN_ADDRESS_LENGTH = 1;
const MAX_ROOMS_LENGTH = 1000;
const MIN_ROOMS_LENGTH = 1;

const requiredDataField = (set, isRequired) => {
  return {
    required: isRequired,
    assertions: [
      oneOf(set)
    ]
  };
};

const validateSchema = {
  'title': {
    required: true,
    converter(val) {
      return val.trim();
    },
    assertions: [
      textRange(MIN_TITLE_LENGTH, MAX_TITLE_LENGTH)
    ]
  },

  'price': {
    required: true,
    assertions: [
      inRange(MIN_PRICE_LENGTH, MAX_PRICE_LENGTH)
    ]
  },

  'features': {
    required: true,
    assertions: [
      anyOf(data.FEATURES)
    ]
  },

  'type': {
    required: true,
    converter(val) {
      return val.trim();
    },
    assertions: [
      oneOf(data.TYPE)
    ]
  },

  'timein': {
    required: true,
    converter(val) {
      return val.trim();
    },
    assertions: [
      oneOf(data.TIME)
    ]
  },

  'timeout': {
    required: true,
    converter(val) {
      return val.trim();
    },
    assertions: [
      oneOf(data.TIME)
    ]
  },

  'rooms': {
    required: true,
    assertions: [
      inRange(MIN_ROOMS_LENGTH, MAX_ROOMS_LENGTH)
    ]
  },

  'address': {
    required: true,
    converter(val) {
      return val.trim();
    },
    assertions: [
      textRange(MIN_ADDRESS_LENGTH, MAX_ADDRESS_LENGTH)
    ]
  },

  'avatar': {
    required: false,
    assertions: [
      isImage()
    ]
  },
  'name': requiredDataField(data.NAMES, false),
};

module.exports = validateSchema;
