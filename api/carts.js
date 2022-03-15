/* exported mapper */
"use strict";
const service = require("../services/carts");
const response = require("../exchange/response");
const mapper = require("../mappers/carts");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:carts:create`);
    try {
        const cart = await service.create(req.body, req.context);
        const message = "Added to cart Successfully";
        log.end();
        return response.success(res, message, cart);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getCarts = async (req, res) => {
    const log = req.context.logger.start(`api:carts:getCarts`);
    try {
        const cart = await service.getCarts(req.query, req.context);
        let message = "Cart Fetched Successfully";
        log.end();
        return response.success(res, message, cart);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const addToFav = async (req, res) => {
    const log = req.context.logger.start(`api:carts:addToFav`);
    try {
        const isFav = await service.addToFav(req.body, req.context);
        if (isFav.err === null || isFav.err === undefined) {
            if (isFav._id) {
                const message = "Product Liked Successfully!!";
                log.end();
                return response.success(res, message, isFav);
            } else {
                const message = "DisLike Successfully!!"
                log.end();
                return response.success(res, message, isFav);
            }
        } else {
            log.end();
            return response.failure(res, isFav.err);
        }
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getFav = async (req, res) => {
    const log = req.context.logger.start(`api:carts:getFav`);
    try {
        const cart = await service.getFav(req.query, req.context);
        let message = "Favorite Products Fetched Successfully";
        log.end();
        return response.success(res, message, cart);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

// const update = async (req, res) => {
//     const log = req.context.logger.start(`api:products:update:${req.params.id}`);
//     try {
//         const product = await service.update(req.params.id, req.body, req.context);
//         let message = 'product updated successfully'
//         log.end();
//         return response.success(res, message, product);
//     } catch (err) {
//         log.error(err);
//         log.end();
//         return response.failure(res, err.message);
//     }
// };

const deleteItem = async (req, res) => {
    const log = req.context.logger.start(`api:products:deleteItem:${req.params.id}`);
    try {
        const cartItem = await service.deleteItem(req.params.id, req.context);
        if (cartItem.err === null || cartItem.err === undefined) {
            let message = "Cart Item Removed Successfully";
            log.end();
            return response.success(res, message, cartItem);
        } else {
            let message = "Item not found";
            log.end();
            return response.success(res, message, cartItem);
        }
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const addAddress = async (req, res) => {
    const log = req.context.logger.start(`api:carts:addToFav`);
    try {
        const addAddress = await service.addAddress(req.body, req.context);
        const message = "Address Added Successfully!!";
        log.end();
        return response.success(res, message, addAddress);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getAddress = async (req, res) => {
    const log = req.context.logger.start(`api:carts:getAddress`);
    try {
        const address = await service.getAddress(req.body, req.context);
        let message = "Address Fetched Successfully";
        log.end();
        return response.data(res, message, address);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.create = create;
exports.getCarts = getCarts;
exports.addToFav = addToFav
exports.getFav = getFav
exports.deleteItem = deleteItem
exports.addAddress = addAddress
exports.getAddress = getAddress