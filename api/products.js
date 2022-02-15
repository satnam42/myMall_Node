"use strict";
const service = require("../services/products");
const response = require("../exchange/response");
// const storeMapper = require("../mappers/product");

const add = async (req, res) => {
    const log = req.context.logger.start(`api:products:add`);
    try {
        const product = await service.add(req.body, req.context);
        const message = "Product Added Successfully";
        log.end();
        return response.success(res, message, product);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


const getProductById = async (req, res) => {
    const log = req.context.logger.start(`api:products:getProductById`);
    try {
        const product = await service.getProductById(req.params.id, req.context);
        const message = "Current Product";
        log.end();
        // return response.success(res, message, storeMapper.toModel(product));
        return response.success(res, message, product);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const getProducts = async (req, res) => {
    const log = req.context.logger.start(`api:products:getProducts`);
    try {
        const product = await service.getProducts(req.context);
        const message = "Product fetched successfully ";
        log.end();
        // return response.success(res, message, storeMapper.toModel(product));
        return response.success(res, message, product);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};



//update product
const update = async (req, res) => {
    const log = req.context.logger.start(`api:products:update`);
    try {
        const product = await service.update(req.params.id, req.body, req.context);
        log.end();
        // return response.data(res, storeMapper.toModel(product));
        return response.data(res, product);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//search api
const search = async (req, res) => {

    const log = req.context.logger.start(`api:products:search:${req.query.name}`);
    try {
        const products = await service.search(req.query.name, req.context);
        log.end();
        return response.data(res, products);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }

};
;

const uploadImage = async (req, res) => {
    const log = req.context.logger.start(`api:products:uploadImage`);
    try {
        const product = await service.imageUpload(req.params.productId, req.params.type, req.files, req.context);
        log.end();
        return response.data(res, product);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.add = add;
exports.search = search;
exports.getProductById = getProductById;
exports.update = update;
exports.uploadImage = uploadImage;
exports.getProducts = getProducts;