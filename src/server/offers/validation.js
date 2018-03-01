const {textRange, isImage, oneOf, inRange} = require(`../util/assertion`);
const data = require(`../../data`);

const MAX_TITLE_LENGTH = 140;
const MIN_TITLE_LENGTH = 30;
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

  'type': requiredDataField(data.TYPE, true),

  'features': requiredDataField(data.FEATURES, false),

  'price': {
    required: true,
    converter(val) {
      return val.trim();
    },
    assertions: [
      inRange(MIN_PRICE_LENGTH, MAX_PRICE_LENGTH)
    ]
  },
  'rooms': {
    required: true,
    converter(val) {
      return val.trim();
    },
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
      inRange(MIN_ADDRESS_LENGTH, MAX_ADDRESS_LENGTH)
    ]
  },
  'avatar': {
    required: false,
    assertions: [
      isImage()
    ]
  },
  'name': requiredDataField(data.NAMES, false),
  'timein': requiredDataField(data.TIME, true),
  'timeout': requiredDataField(data.TIME, true),
};

module.exports = validateSchema;
