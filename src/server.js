const express = require(`express`);
const multer = require(`multer`);
const bodyParser = require(`body-parser`);
const {generateEntity} = require(`./generator/wizards-generator`);

const app = express();
app.use(express.static(`static`));
app.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});

const data = (count) => {
  let dataArray = [];
  while (count > 0) {
    dataArray.push(generateEntity());
    count--;
  }
  return dataArray;
};

const toOffers = function (skip = 0, limit = 20) {
  return {
    data: data(+limit).slice(skip, skip + limit),
    skip,
    limit,
    total: data(limit).length,
  };
};

app.get(`/api/offers`, (req, res) => {
  res.send(toOffers(req.query.skip, req.query.limit));
});

app.get(`/api/offers/:date`, (req, res) => {
  const date = req.params[`date`].toLowerCase();
  const offersData = toOffers();
  const offer = toOffers && offersData.find((it) => it.date.toLowerCase() === date);
  if (!offer) {
    res.status(404).end();
  } else {
    res.send(offer);
  }
});

const appUpload = upload.fields([{name: `avatar`, maxCount: 1}, {name: `photos`, maxCount: 3}]);

app.post(`/api/offers`, appUpload, (req, res) => {
  res.send(req.body);
});

const HOSTNAME = `localhost`;
const PORT = `3000`;

module.exports = {
  name: `server`,
  description: `run server [PORT]`,
  execute(args) {
    const port = args[0] && !isNaN(args[0]) && parseInt(args[0], 10) || PORT;
    const serverAddress = `http://${HOSTNAME}:${port}/`;
    app.listen(port, HOSTNAME, () => {
      console.log(`server running at ${serverAddress}`);
    });
  },
  app,
};
