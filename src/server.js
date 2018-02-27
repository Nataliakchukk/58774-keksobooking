const express = require(`express`);
const multer = require(`multer`);
const bodyParser = require(`body-parser`);
const {generateEntity} = require(`./generator/wizards-generator`);

const app = express();
app.use(express.static(`static`));
app.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});

const offers = function (skip = 0, limitCount = 20, callback) {
  let dataArray = [];
  let skipDataArray = [];
  while (limitCount > 0) {
    dataArray.push(generateEntity());
    limitCount--;
  }
  const skipCount = skip < dataArray.length ? skip : 0;
  for(let i = skipCount; i < dataArray.length; i++ ) {
    skipDataArray.push( dataArray[i]);
  }
  return skipDataArray || dataArray;
};

app.get(`/api/offers`, (req, res) => {
  res.send(offers(req.query.skip,req.query.limit ));
});

app.get(`/api/offers/:date`, (req, res) => {
  const date = req.params[`date`].toLowerCase();
  const offersData = offers();
  const offer = offers && offersData.find((it) => it.date.toLowerCase() === date);
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
