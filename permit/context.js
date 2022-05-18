"use strict";
const auth = require("./auth");
const response = require("../exchange/response");



const builder = (req, res, next) => {

    const context = {
        logger: require("@open-age/logger")("permit:context:builder")
    };

    req.context = context;

    if (next) {
        return next();
    }

    return null;

};



const validateToken = async (req, res, next) => {

    builder(req, res);

    const log = req.context.logger.start(`permit:auth:validateToken`);

    const token = req.headers["x-access-token"];

    if (!token) {
        return response.failure(res, "token is required");
    }

    const details = auth.extractToken(token, req.context);

    if (details.name === "TokenExpiredError") {
        return response.unAuthorized(res, "token expired");
    }

    if (details.name === "JsonWebTokenError") {
        return response.failure(res, "token is invalid");
    }

    const user = await db.user.findById(details._id)

    if (!user) {
        return response.failure(res, "invalid user");
    }

    req.context.user = user

    log.end();
    return next();

};
const withTokenOrWithOutToken = async (req, res, next) => {
    builder(req, res);
    const log = req.context.logger.start(`permit:auth:validateToken`);

    if (req.headers["x-access-token"]) {
        const token = req.headers["x-access-token"];

        if (!token) {
            return response.failure(res, "token is required");
        }

        const details = auth.extractToken(token, req.context);

        if (details.name === "TokenExpiredError") {
            return response.unAuthorized(res, "token expired");
        }

        if (details.name === "JsonWebTokenError") {
            return response.failure(res, "token is invalid");
        }

        const user = await db.user.findById(details._id)

        if (!user) {
            return response.failure(res, "invalid user");
        }

        req.context.user = user
    }

    log.end();
    return next();

};

const requiresToken = async (req, res, next) => {
    builder(req, res);
    const log = req.context.logger.start(`permit:auth:requiresToken`);
    const token = req.headers["x-access-token"];
    if (!token) {
        return response.failure(res, "token is required");
    }
    const decodedUser = auth.extractToken(token, req.context);
    const user = await db.user.findById(decodedUser.id);
    if (!user) {
        return response.failure(res, "invalid user");
    }
    req.context.user = user
    log.end();
    return next();
};

// const checkPermission = async (req, res, next) => {
//     const log = req.context.logger.start(`permit:auth:checkPermission`);
//     if (req.context.user.role === 'user') {
//         return response.failure(res, "you don't have permission");
//     }
//     else {
//         return next();
//     }
// };




exports.builder = builder;
exports.requiresToken = requiresToken;
exports.validateToken = validateToken;
exports.withTokenOrWithOutToken = withTokenOrWithOutToken;
// exports.checkPermission = checkPermission;