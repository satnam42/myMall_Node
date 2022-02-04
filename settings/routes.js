"use strict";

const fs = require("fs");
const api = require("../api");
const specs = require("../specs");
const permit = require("../permit")
const validator = require("../validators");
// const path = require("path");
// const express = require("express");

const configure = (app, logger) => {
    const log = logger.start("settings:routes:configure");
    app.get("/specs", function (req, res) {
        fs.readFile("./public/specs.html", function (err, data) {
            if (err) {
                return res.json({
                    isSuccess: false,
                    error: err.toString()
                });
            }
            res.contentType("text/html");
            res.send(data);
        });
    });


    app.get("/api/specs", function (req, res) {
        res.contentType("application/json");
        res.send(specs.get());
    });
    // //react js project setup////
    // const root = path.join(__dirname, '../../startupbundle_bin_reactjs/', 'build')
    // app.use(express.static(root));
    // app.get('/*', function(req, res, next) {
    //     if (!req.path.includes('api')) {
    //         res.sendFile('index.html', { root });
    //     } else next();
    // });

    //user api's //
    app.post("/api/users/create",
        permit.context.builder,
        validator.users.create,
        api.users.create
    );

    app.post(
        "/api/users/login",
        permit.context.builder,
        validator.users.login,
        api.users.login
    );

    app.put(
        "/api/users/resetPassword/:id",
        permit.context.validateToken,
        api.users.resetPassword,
        validator.users.resetPassword,
    );

    app.put(
        "/api/users/update/:id",
        permit.context.validateToken,
        validator.users.update,
        api.users.update
    );

    app.get(
        "/api/users/getUserById/:id",
        permit.context.builder,
        api.users.getUserById
    );

    app.get(
        "/api/users/search",
        permit.context.validateToken,
        api.users.search
    );

    app.post(
        "/api/users/forgotPassword",
        permit.context.builder,
        api.users.forgotPassword
    );

    app.post(
        "/api/users/otpVerify",
        permit.context.validateToken,
        api.users.otpVerify
    );

    app.post(
        "/api/users/changePassword",
        permit.context.validateToken,
        api.users.changePassword
    );

    app.put(
        "/api/users/profileImageUpload/:id",
        permit.context.builder,
        api.users.uploadProfileImage
    );
    log.end();
};

exports.configure = configure;