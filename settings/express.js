"use strict";
const path = require("path");
const cors = require("cors");
const express = require("express");
var multer = require('multer');
// image uplaod location //
var storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, path.join(__dirname, '../', 'assets/images'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname.replace(/ /g, ''));
  }
});

const configure = async (app, logger) => {
  const log = logger.start("settings:express:configure");
  app.use(express.json({ limit: "50mb" }));
  app.use(cors());
  // Kilobytes to Megabytes
  // 1024 => 1mb
  //  20mb =1024 * 20

  app.use(multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 20 } }).any());;

  app.use(
    express.urlencoded({
      extended: true,
      limit: "50mb",
      parameterLimit: 50000
    })
  );

  // app.use(
  //   bodyParser({
  //     limit: "50mb",
  //     keepExtensions: true
  //   })
  // );

  const root = path.normalize(__dirname + "./../");
  app.use(express.static(path.join(root, "public")));
  log.end();

};

exports.configure = configure;

