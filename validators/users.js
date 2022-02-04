"use strict";
const response = require("../exchange/response");

const create = (req, res, next) => {
    const log = req.context.logger.start("validators:users:create");

    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        log.end();
        return response.failure(res, "body is required");
    }
    if (!req.body.email) {
        log.end();
        return response.failure(res, "email is required");
    }
    if (!req.body.password) {
        log.end();
        return response.failure(res, "password is required");
    }
    log.end();
    return next();
};



const login = (req, res, next) => {
    const log = req.context.logger.start("validators:users:login");

    if (!req.body) {
        log.end();
        return response.failure(res, "body is equired");
    }
    if (!req.body.email) {
        log.end();
        return response.failure(res, "email is required");
    }
    if (!req.body.password) {
        log.end();
        return response.failure(res, "password is required");
    }

    log.end();
    return next();
};

// change password
const resetPassword = (req, res, next) => {
    const log = req.context.logger.start("validators:users:resetPassword");

    if (!req.body.newPassword) {
        log.end();
        return response.failure(res, "password is required");
    }

    log.end();
    return next();
};

const update = (req, res, next) => {
    const log = req.context.logger.start("validators:users:update");

    if (!req.body) {
        log.end();
        return response.failure(res, "body is required");
    }
    if (!req.params.id) {
        log.end();
        return response.failure(res, "user id is required");
    }

    log.end();
    return next();
};

const follow = (req, res, next) => {
    const log = req.context.logger.start("validators:users:follow");

    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        log.end();
        return response.failure(res, "body is required");
    }
    if (!req.body.userId) {
        log.end();
        return response.failure(res, "userId is required");
    }
    if (!req.body.toFollow) {
        log.end();
        return response.failure(res, "Follow id is required");
    }
    log.end();
    return next();
};

const unfollow = (req, res, next) => {
    const log = req.context.logger.start("validators:users:unfollow");

    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        log.end();
        return response.failure(res, "body is required");
    }
    if (!req.body.userId) {
        log.end();
        return response.failure(res, "userId is required");
    }
    if (!req.body.toUnfollow) {
        log.end();
        return response.failure(res, "UnFollow id is required");
    }
    log.end();
    return next();
};


exports.login = login;
exports.create = create;
exports.update = update;
exports.resetPassword = resetPassword;
exports.follow = follow;
exports.unfollow = unfollow;