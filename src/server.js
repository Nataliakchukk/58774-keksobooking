const http = require(`http`);
const url = require(`url`);
const path = require(`path`);
const fs = require(`fs`);
const {promisify} = require(`util`);

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const readfile = promisify(fs.readFile);

const PORT = `3000`;
const HOSTNAME = `127.0.0.1`;


const printDirectory = (files) => {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Directoty content</title>
      </head>
      <body>
      <div>Все работает?</div>
      <ul>
        ${files.map((it) => `<li><a href="${it}">${it}</a></li>`).join(``)}
      </ul>
      </body>
    </html>`;
};
const FILETYPE = {
  'css': `text/css`,
  'html': `text/html; charset=UTF-8`,
  'jpg': `image/jpeg`,
  'png': `image/png`,
  'gif': `image/gif`,
  'ico': `image/x-icon`
};

const readFile = async (filePath, res) => {
  const data = await readfile(filePath);
  const pathEnd = path.extname(filePath).replace(`.`, ``);
  const setContentType = FILETYPE[pathEnd] || `text/plain`;
  res.setHeader(`content-type`, setContentType);
  res.setHeader(`content-lenght`, Buffer.byteLength(data));
  res.end(data);
};

const readDir = async (filePath, res) => {
  const files = await readdir(filePath);
  console.log(`pathEndFile`, filePath);
  res.setHeader(`content-type`, `text/html`);
  const content = printDirectory(filePath, files);
  res.setHeader(`content-length`, Buffer.byteLength(content));
  res.end(content);
};

const serverRun = (port) => {
  const server = http.createServer((req, res) => {
    const absolutePath = path.resolve(__dirname, `../static`) + url.parse(req.url).pathname;
    (async () => {
      try {
        const pathStat = await stat(absolutePath);

        res.statusCode = 200;
        res.statusMessage = `OK`;

        if (pathStat.isDirectory()) {
          await readDir(absolutePath, res);
        } else {
          await readFile(absolutePath, res);
        }
      } catch (e) {
        res.writeHead(404, `Not Found`);
        res.end();
      }
    })().catch((e) => {
      res.writeHead(500, e.message, {
        [`content-type`]: `text/plain`
      });
      res.end(e.message);
    });
  });

  server.listen(port, HOSTNAME, ()=> {
    console.log(`server running at http://${HOSTNAME}:${port}/`);
  });
};

module.exports = {
  name: `server`,
  descriotion: `run server`,
  execute(args) {
    const port = !isNaN(args[0]) && parseInt(args[0], 10) || PORT;
    serverRun(port);
  },
};
