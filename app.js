"use strict";

const express = require("express");
const appConfig = require("config").get("app");
const logger = require("@open-age/logger")("server");
const Http = require("http");
const port = process.env.PORT || appConfig.port || 3000;
// var admin = require("firebase-admin");
const app = express();
var server = Http.createServer(app);
// require('./communication/chat.js').sockets(server);
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
// require('./socket/socketEvents').sockets(server)

const boot = () => {
  const log = logger.start("app:boot");
  log.info(`environment:  ${process.env.NODE_ENV}`);
  log.info("starting server");
  server.listen(port, () => {
    log.info(`listening on port: ${port}`);
    log.end();
  });
};

const init = async () => {
  await require("./settings/database").configure(logger);
  await require("./settings/express").configure(app, logger);
  await require("./settings/routes").configure(app, logger);
  // require("./socket/socketEvents").sockets(server, logger);

  // app.get('/chat', function (req, res) {
  //   res.sendFile(__dirname + '/templates/index.html');
  // });
  boot();

};

init();
