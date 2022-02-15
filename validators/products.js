"use strict";
const response = require("../exchange/response");

const create = (req, res, next) => {
    const log = req.context.logger.start("validators:products:create");

    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        log.end();
        return response.failure(res, "body is required");
    }
    if (!req.body.name) {
        log.end();
        return response.failure(res, "name is required");
    }
    if (!req.body.description) {
        log.end();
        return response.failure(res, "description is required");
    }
    if (!req.body.masterPrice) {
        log.end();
        return response.failure(res, "please set product price");
    }

    log.end();
    return next();
};


const update = (req, res, next) => {
    const log = req.context.logger.start("validators:products:update");

    if (!req.body) {
        log.end();
        return response.failure(res, "body is required");
    }
    if (!req.params.id) {
        log.end();
        return response.failure(res, "product id is required");
    }

    log.end();
    return next();
};



exports.create = create;
exports.update = update;