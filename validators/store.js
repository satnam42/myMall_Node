"use strict";
const response = require("../exchange/response");

const create = (req, res, next) => {
    const log = req.context.logger.start("validators:store:create");

    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        log.end();
        return response.failure(res, "body is required");
    }
    if (!req.body.name) {
        log.end();
        return response.failure(res, "name is required");
    }
    if (!req.body.userId) {
        log.end();
        return response.failure(res, "userId is required");
    }

    log.end();
    return next();
};


const update = (req, res, next) => {
    const log = req.context.logger.start("validators:store:update");

    if (!req.body) {
        log.end();
        return response.failure(res, "body is required");
    }
    if (!req.params.id) {
        log.end();
        return response.failure(res, "store id is required");
    }

    log.end();
    return next();
};



exports.create = create;
exports.update = update;