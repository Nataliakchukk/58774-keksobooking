const {Router} = require(`express`);
const {validateSchema} = require(`../util/validator`);
const offersSchema = require(`./validation`);
const dataRenderer = require(`../util/data-renderer`);
const ValidationError = require(`../errors/validation-error`);
const NotFoundError = require(`../errors/not-found-error`);
const async = require(`../util/async`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const createStreamFromBuffer = require(`../util/buffer-to-stream`);


const offersRouter = new Router();

offersRouter.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});


const toOffers = async (cursor, skip = 0, limit = 20) => {
  return {
    data: await (cursor.skip(skip).limit(limit).toArray()),
    skip,
    limit,
    total: await (cursor.count())
  };
};


offersRouter.get(``, async(async (req, res) => res.send(await toOffers(await offersRouter.offerStore.getAllOffers(), req.query.skip, req.query.limit))));

const offersRouterUpload = upload.fields([{name: `avatar`, maxCount: 1}, {name: `photos`, maxCount: 3}]);

offersRouter.post(``, offersRouterUpload, async(async (req, res) => {
  const dataPost = req.body;
  const avatar = req.file;
  if (avatar) {
    dataPost.avatar = avatar;
  }

  const errors = validateSchema(dataPost, offersSchema);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  if (avatar) {
    const avatarInfo = {
      path: `api/offers/${dataPost.date}/avatar/`,
      mimetype: avatar.mimetype,
    };
    await offersRouter.imageStore.save(avatarInfo.path, createStreamFromBuffer(avatar.buffer));
    dataPost.avatar = avatarInfo;
  }

  await offersRouter.offerStore.save(dataPost);
  dataRenderer.renderDataSuccess(req, res, dataPost);
}));

offersRouter.get(`/:date`, async(async (req, res) => {
  const offerDate = req.params.date;

  const found = await offersRouter.offerStore.getOffer(offerDate);
  if (!found) {
    throw new NotFoundError(`Offer with name "${offerDate}" not found`);
  }
  res.send(found);
}));


offersRouter.get(`/:date/avatar`, async(async (req, res) => {
  const offerDate = req.params.date;

  const offer = await offersRouter.offersStore.getOffer(offerDate);

  if (!offer) {
    throw new NotFoundError(`Offer with name "${offerDate}" not found`);
  }

  const avatar = offer.avatar;

  if (!avatar) {
    throw new NotFoundError(`Offer with name "${offerDate}" didn't upload avatar`);
  }

  const {info, stream} = await offersRouter.imageStore.get(avatar.path);

  if (!info) {
    throw new NotFoundError(`File was not found`);
  }

  res.set(`content-type`, avatar.mimetype);
  res.set(`content-length`, info.length);
  res.status(200);
  stream.pipe(res);
}));

offersRouter.use((exception, req, res, next) => {
  let dataException = exception;
  if (exception instanceof ValidationError) {
    dataException = exception.errors;
  }
  res.status(400).send(dataException);
  next();
});

module.exports = (offerStore, imageStore) => {
  offersRouter.offerStore = offerStore;
  offersRouter.imageStore = imageStore;
  return offersRouter;
};
