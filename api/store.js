"use strict";
const service = require("../services/store");
const response = require("../exchange/response");
// const storeMapper = require("../mappers/store");

//register api
const create = async (req, res) => {
    const log = req.context.logger.start(`api:store:create`);
    try {
        const store = await service.create(req.body, req.context);
        const message = "Store Created Successfully";
        log.end();
        // return response.success(res, message, storeMapper.toModel(store));
        return response.success(res, message, store);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


const getStoreById = async (req, res) => {
    const log = req.context.logger.start(`api:store:getStoreById`);
    try {
        const store = await service.getStoreById(req.params.id, req.context);
        const message = "Current Store";
        log.end();
        // return response.success(res, message, storeMapper.toModel(store));
        return response.success(res, message, store);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};



//update store
const update = async (req, res) => {
    const log = req.context.logger.start(`api:store:update`);
    try {
        const store = await service.update(req.params.id, req.body, req.context);
        log.end();
        // return response.data(res, storeMapper.toModel(store));
        return response.data(res, store);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//search api
const search = async (req, res) => {

    const log = req.context.logger.start(`api:store:search:${req.query.name}`);
    try {
        const store = await service.search(req.query.name, req.context);
        log.end();
        return response.data(res, store);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }

};
;

const uploadImage = async (req, res) => {
    const log = req.context.logger.start(`api:store:uploadImage`);
    try {
        const store = await service.imageUpload(req.params.storeId, req.params.type, req.files, req.context);
        log.end();
        return response.data(res, store);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const favOrUnFav = async (req, res) => {
    const log = req.context.logger.start(`api:stores:favOrUnFav`);
    try {
        const fav = await service.makeFavOrUnFav(req.body, req.context);
        log.end();
        return response.data(res, fav);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const favStores = async (req, res) => {
    const log = req.context.logger.start(`api:stores:favStores`);
    try {
        const fav = await service.getFavStores(req.params.id, req.context);
        log.end();
        return response.data(res, fav);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:stores:list`);
    try {
        const stores = await service.getAllStores(req.context);
        log.end();
        return response.data(res, stores);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.create = create;
exports.search = search;
exports.getStoreById = getStoreById;
exports.update = update;
exports.uploadImage = uploadImage;
exports.favOrUnFav = favOrUnFav;
exports.favStores = favStores;
exports.list = list;