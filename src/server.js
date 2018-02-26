const express = require(`express`);
const multer = require(`multer`);
const bodyParser = require(`body-parser`);
const {generateEntity} = require(`./generator/wizards-generator`);

const app = express();
app.use(express.static(`static`));
app.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});

const offers = generateEntity();

app.get(`/api/offers`, (req, res) => res.send(offers));

app.get(`/api/offers/:date`, (req, res) => {
  const date = req.params[`date`].toLowerCase();
  const offer = offers && offers.find((it) => it.date.toLowerCase() === date);
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

const HOSTNAME = `127.0.0.1`;
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
