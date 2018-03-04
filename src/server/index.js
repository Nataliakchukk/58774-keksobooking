const express = require(`express`);
const offerStore = require(`./offers/store`);
const imageStore = require(`./images/store`);
const offerRouter = require(`./offers/router`)(offerStore, imageStore);

const HOSTNAME = `localhost`;
const PORT = `3000`;

const app = express();
app.use(express.static(`static`));

app.use(`/api/offers`, offerRouter);

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
