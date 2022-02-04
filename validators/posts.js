"use strict";
const response = require("../exchange/response");

const create = (req, res, next) => {
    const log = req.context.logger.start("validators:posts:create");

    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        log.end();
        return response.failure(res, "body is required");
    }
    if (!req.body.postBy) {
        log.end();
        return response.failure(res, "user id  is required");
    }

    log.end();
    return next();
};

exports.create = create;
