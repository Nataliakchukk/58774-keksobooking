const {Router} = require(`express`);
const {validateSchema} = require(`../util/validator`);
const offersSchema = require(`./validation`);
const ValidationError = require(`../errors/validation-error`);
const async = require(`../util/async`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {generateEntity} = require(`../../generator/wizards-generator`);

const offersRouter = new Router();

offersRouter.use(bodyParser.json());
const upload = multer({storage: multer.memoryStorage()});

const data = [...new Array(100)].map(()=>generateEntity());

const toOffers = function (skip = 0, limit = 20) {
  return {
    data: data.slice(skip, skip + limit),
    skip,
    limit,
    total: data.length
  };
};


offersRouter.get(``, async(async (req, res) => res.send(await toOffers(req.query.skip, req.query.limit))));

offersRouter.get(`/:date`, async(async (req, res) => {
  const date = req.params[`date`].toLowerCase();
  const offersData = toOffers();
  const offer = toOffers && offersData.find((it) => it.date.toLowerCase() === date);
  if (!offer) {
    res.status(404).end();
  } else {
    res.send(offer);
  }
}));

const offersRouterUpload = upload.fields([{name: `avatar`, maxCount: 1}, {name: `photos`, maxCount: 3}]);

offersRouter.post(``, offersRouterUpload, async(req, res) => {
  const dataReq = req.body;
  const avatar = req.file;
  if(avatar) {
    data.avatar = avatar;
  }
  const errors = validateSchema(data, offersSchema);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  res.send(dataReq);
});

offersRouter.use((exception, req, res, next) => {
  let data = exception;
  if (exception instanceof  ValidationError) {
    data = exception.errors;
  }
  res.status(400).send(data);
  next();
});

module.exports = offersRouter;
