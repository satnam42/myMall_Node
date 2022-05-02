"use strict";
const service = require("../services/addresses");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:addresses:create`);
    try {
        const address = await service.create(req.body, req.context);
        const message = "address added Successfully";
        log.end();
        // return response.success(res, message, addressMapper.toModel(address));
        return response.success(res, message, address);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getUserById = async (req, res) => {
    const log = req.context.logger.start(`api:addresses:getUserById`);
    try {
        const address = await service.getUserById(req.params.id, req.context);
        log.end();
        return response.data(res, address);
        // return response.success(res, message, address);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getAddressById = async (req, res) => {
    const log = req.context.logger.start(`api:addresses:getAddressById`);
    try {
        const address = await service.getAddressById(req.params.id, req.context);
        log.end();
        return response.data(res, address);
        // return response.success(res, message, address);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//update address
const update = async (req, res) => {
    const log = req.context.logger.start(`api:addresses:update`);
    try {
        const address = await service.update(req.params.id, req.body, req.context);
        log.end();
        // return response.data(res, addressMapper.toModel(address));
        return response.data(res, address);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.create = create;
exports.getUserById = getUserById;
exports.update = update;
exports.getAddressById = getAddressById;