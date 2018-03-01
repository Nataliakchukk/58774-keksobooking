const {Router} = require(`express`);
const {validateSchema} = require(`../util/validator`);
const dataRenderer = require(`../util/data-renderer`);
const offersSchema = require(`./validation`);
const ValidationError = require(`../errors/validation-error`);
const async = require(`../util/async`);
// const NotFoundError = require(`../errors/not-found-error`);
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

offersRouter.post(``, offersRouterUpload, async(async (req, res) => {
  const dataPost = req.body;
  const avatar = req.file;

  if (avatar) {
    const avatarInfo = {
      path: `api/offers/${dataPost.username}/avatar`,
      mimetype: avatar.mimetype,
    };
    dataPost.avatar = avatarInfo;
  }

  console.log(dataPost);
  const errors = validateSchema(dataPost, offersSchema);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  dataRenderer.renderDataSuccess(req, res, data);
  res.send(dataPost);
}));

offersRouter.use((exception, req, res, next) => {
  let dataException = exception;
  if (exception instanceof ValidationError) {
    dataException = exception.errors;
  }
  res.status(400).send(dataException);
  next();
});

module.exports = offersRouter;
