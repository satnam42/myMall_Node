"use strict";
const service = require("../services/users");
const response = require("../exchange/response");
const userMapper = require("../mappers/user");

//register api
const create = async (req, res) => {
    const log = req.context.logger.start(`api:users:create`);
    try {
        const user = await service.create(req.body, req.context);
        const message = "User Register Successfully";
        log.end();
        // return response.success(res, message, userMapper.toModel(user));
        return response.success(res, message, user);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//login api  
const login = async (req, res) => {
    const log = req.context.logger.start("api:users:login");
    try {
        const user = await service.login(req.body, req.context);
        log.end();
        let message = "login successfully"
        return response.authorized(res, message, userMapper.toModel(user), user.token);
        // return response.authorized(res, message, user, user.token);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getUserById = async (req, res) => {
    const log = req.context.logger.start(`api:users:getUserById`);
    try {
        const user = await service.getUserById(req.params.id, req.context);
        const message = "Current User";
        log.end();
        return response.success(res, message, userMapper.toModel(user));
        // return response.success(res, message, user);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

// reset password
const resetPassword = async (req, res) => {
    const log = req.context.logger.start("api:users:changePassword");
    try {
        const message = await service.resetPassword(req.params.id, req.body, req.context);
        log.end();
        return response.success(res, message);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};



//update user
const update = async (req, res) => {
    const log = req.context.logger.start(`api:users:update`);
    try {
        const user = await service.update(req.params.id, req.body, req.context);
        log.end();
        // return response.data(res, userMapper.toModel(user));
        return response.data(res, user);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const changePassword = async (req, res) => {
    const log = req.context.logger.start("api:users:changePassword");
    try {
        const msg = await service.changePassword(req.body, req.headers["x-access-token"], req.context);
        log.end();
        return response.success(res, msg, "");
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const otpVerify = async (req, res) => {
    const log = req.context.logger.start("api:users:otpVerify");
    try {
        const msg = await service.otpVerify(req.body, req.headers["x-access-token"], req.context);
        log.end();
        return response.success(res, msg, '');
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//forgotPassword api
const forgotPassword = async (req, res) => {
    const log = req.context.logger.start("api:users:forgotPassword");
    try {
        const data = await service.forgotPassword(req.body, req.context);
        const message = "OTP successfully sent on register email";
        log.end();
        return response.success(res, message, data);

    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }

};

//search api
const search = async (req, res) => {

    const log = req.context.logger.start(`api:users:search:${req.query.name}`);
    try {
        const users = await service.search(req.query.name, req.context);
        log.end();
        return response.data(res, users);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }

};
;

const uploadProfileImage = async (req, res) => {
    const log = req.context.logger.start(`api:posts:upload`);
    try {
        const product = await service.imageUpload(req.params.id, req.files, req.context);
        log.end();
        return response.data(res, product);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.login = login;
exports.create = create;
exports.search = search;
exports.getUserById = getUserById;
exports.changePassword = changePassword;
exports.resetPassword = resetPassword;
exports.forgotPassword = forgotPassword;
exports.otpVerify = otpVerify;
exports.update = update;
exports.uploadProfileImage = uploadProfileImage;