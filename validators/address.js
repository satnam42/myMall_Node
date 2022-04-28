"use strict";
const response = require("../exchange/response");

const create = (req, res, next) => {
    const log = req.context.logger.start("validators:address:create");

    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        log.end();
        return response.failure(res, "body is required");
    }
    if (!req.body.userId || req.body.userId == "") {
        log.end();
        return response.failure(res, "user id is required");
    }
    if (!req.body.fullName) {
        log.end();
        return response.failure(res, "fullName is required");
    }
    if (!req.body.area) {
        log.end();
        return response.failure(res, "area is required");
    }
    if (!req.body.buildingNo) {
        log.end();
        return response.failure(res, "buildingNo is required");
    }
    if (!req.body.city) {
        log.end();
        return response.failure(res, "city is required");
    }
    if (!req.body.country) {
        log.end();
        return response.failure(res, "country is required");
    }

    log.end();
    return next();
};






exports.create = create;