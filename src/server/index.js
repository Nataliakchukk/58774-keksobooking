const express = require(`express`);
const offerStore = require(`./offers/store`);
const imageStore = require(`./images/store`);
const logger = require(`../logger`);
const router = require(`./offers/router`);

const HOSTNAME = process.env.SERVER_HOST || `localhost`;
const PORT = parseInt(process.env.SERVER_PORT, 10) || 3000;

const app = express();
app.use(express.static(`static`));

module.exports = {
  name: `server`,
  description: `run server [PORT]`,
  execute(args) {

    const offerRouter = router(offerStore.getOfferStore(), imageStore);
    app.use(`/api/offers`, offerRouter);

    const port = args[0] && !isNaN(args[0]) && parseInt(args[0], 10) || PORT;
    const serverAddress = `http://${HOSTNAME}:${port}/`;
    app.listen(port, HOSTNAME, () => {
      logger.info(`server running at ${serverAddress}`);
    });
  },
  app,
};
