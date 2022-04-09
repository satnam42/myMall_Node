"use strict";
const service = require("../services/notifications");
const response = require("../exchange/response");


const dealOfTheDay = async (req, res) => {
    const log = req.context.logger.start("api:notifications:dealOfTheDAy");
    try {
        const notification = await service.dealOfTheDAy(req.body, req.context);
        log.end();
        return response.data(res, notification);
        // return response.authorized(res, message, user, user.token);
    }
    catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }

};


exports.dealOfTheDay = dealOfTheDay;


