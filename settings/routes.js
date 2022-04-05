"use strict";

const fs = require("fs");
const api = require("../api");
const specs = require("../specs");
const permit = require("../permit")
const validator = require("../validators");
// const path = require("path");
// const express = require("express");

const configure = (app, logger) => {
    const log = logger.start("settings:routes:configure");
    app.get("/specs", function (req, res) {
        fs.readFile("./public/specs.html", function (err, data) {
            if (err) {
                return res.json({
                    isSuccess: false,
                    error: err.toString()
                });
            }
            res.contentType("text/html");
            res.send(data);
        });
    });


    app.get("/api/specs", function (req, res) {
        res.contentType("application/json");
        res.send(specs.get());
    });
    // //react js project setup////
    // const root = path.join(__dirname, '../../startupbundle_bin_reactjs/', 'build')
    // app.use(express.static(root));
    // app.get('/*', function(req, res, next) {
    //     if (!req.path.includes('api')) {
    //         res.sendFile('index.html', { root });
    //     } else next();
    // });

    //user api's //
    app.post("/api/users/create",
        permit.context.builder,
        validator.users.create,
        api.users.create
    );

    app.post(
        "/api/users/login",
        permit.context.builder,
        validator.users.login,
        api.users.login
    );

    app.put(
        "/api/users/resetPassword/:id",
        permit.context.validateToken,
        api.users.resetPassword,
        validator.users.resetPassword,
    );

    app.put(
        "/api/users/update/:id",
        permit.context.validateToken,
        validator.users.update,
        api.users.update
    );

    app.get(
        "/api/users/getUserById/:id",
        permit.context.builder,
        api.users.getUserById
    );

    app.get(
        "/api/users/search",
        permit.context.validateToken,
        api.users.search
    );

    app.post(
        "/api/users/forgotPassword",
        permit.context.builder,
        api.users.forgotPassword
    );

    app.post(
        "/api/users/otpVerify",
        permit.context.validateToken,
        api.users.otpVerify
    );

    app.post(
        "/api/users/changePassword",
        permit.context.validateToken,
        api.users.changePassword
    );

    app.put(
        "/api/users/profileImageUpload/:id",
        permit.context.builder,
        api.users.uploadProfileImage
    );
    app.post("/api/store/create",
        permit.context.builder,
        validator.store.create,
        api.store.create
    );

    app.put(
        "/api/store/update/:id",
        permit.context.validateToken,
        validator.store.update,
        api.store.update
    );

    app.get(
        "/api/store/getStoreById/:id",
        permit.context.builder,
        api.store.getStoreById
    );

    app.get(
        "/api/store/search",
        permit.context.validateToken,
        api.store.search
    );

    app.put(
        "/api/store/imageUpload/:storeId/:type",
        permit.context.builder,
        api.store.uploadImage
    );
    app.post("/api/store/makeFavOrUnfav",
        permit.context.builder,
        api.store.favOrUnFav
    );
    app.get(
        "/api/store/favList/:id",
        permit.context.builder,
        api.store.favStores
    );
    app.get(
        "/api/store/myStores/:id",
        permit.context.validateToken,
        api.store.myStores
    );

    app.get(
        "/api/store/list",
        permit.context.builder,
        api.store.list
    );

    app.post("/api/products/add",
        permit.context.validateToken,
        validator.products.create,
        api.products.add
    );

    app.put(
        "/api/products/update/:id",
        permit.context.validateToken,
        validator.products.update,
        api.products.update
    );

    app.get(
        "/api/products/getProductById/:id",
        permit.context.builder,
        api.products.getProductById
    );

    app.get(
        "/api/products/getProducts",
        permit.context.builder,
        api.products.getProducts
    );

    app.post("/api/products/makeFavOrUnfav",
        permit.context.builder,
        api.products.favOrUnFav
    );
    app.get(
        "/api/products/favList/:id",
        permit.context.builder,
        api.products.favProducts
    );

    app.get(
        "/api/products/search",
        permit.context.validateToken,
        api.products.search
    );

    app.put(
        "/api/products/imageUpload/:productId/:type",
        permit.context.builder,
        api.products.uploadImage
    );

    app.post(
        "/api/categories/createCategory",
        permit.context.builder,
        api.categories.createCategory
    );

    app.post(
        "/api/categories/createSubCategory",
        permit.context.builder,
        api.categories.createSubCategory
    );

    app.post(
        "/api/categories/getCategories",
        permit.context.builder,
        api.categories.getCategories
    );

    app.delete(
        "/api/categories/delete/:id",
        permit.context.builder,
        api.categories.remove
    );

    /* Cart Section */

    app.post(
        "/api/carts/addToCart",
        permit.context.builder,
        api.carts.create
    );

    // app.post(
    //     "/api/carts/addToFav",
    //     permit.context.builder,
    //     api.carts.addToFav
    // );

    // app.get(
    //     "/api/carts/getFav",
    //     permit.context.builder,
    //     api.carts.getFav
    // );

    app.get(
        "/api/carts/getCarts",
        permit.context.builder,
        api.carts.getCarts
    );

    app.delete(
        "/api/carts/deleteItem/:id",
        permit.context.builder,
        api.carts.deleteItem
    );

    app.post(
        "/api/carts/addAddress",
        permit.context.builder,
        api.carts.addAddress
    );

    app.post(
        "/api/carts/getAddress",
        permit.context.builder,
        api.carts.getAddress
    );

    /* Orders Section */

    app.post(
        "/api/orders/placeOrder",
        permit.context.builder,
        api.orders.placeOrder
    );

    app.get(
        "/api/orders/getOrder",
        permit.context.builder,
        api.orders.getOrder
    );

    app.post(
        "/api/orders/updateStatus",
        permit.context.builder,
        api.orders.updateStatus
    );

    app.get(
        "/api/orders/getAllOrders",
        permit.context.builder,
        api.orders.getAllOrders
    );

    /* payment */

    app.post(
        "/api/transactions/create",
        permit.context.builder,
        api.transactions.create
    );

    log.end();

};

exports.configure = configure;