const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");
const fs = require('fs');
const { size } = require("lodash");

const setProduct = async (model, product, context) => {
    const log = context.logger.start("services:products:setStore");

    if (model.name !== "string" && model.name !== undefined) {
        product.name = model.name;
    }

    if (model.description !== "string" && model.description !== undefined) {
        product.description = model.description;
    }

    if (model.productUrl !== "string" && model.productUrl !== undefined) {
        product.productUrl = model.productUrl;
    }

    if (model.feature.length > 0) {
        product.feature = model.feature;
    }
    if (model.size.length > 0) {
        product.size = model.size;
    }
    if (model.color.length > 0) {
        product.color = model.color;
    }
    product.updatedAt = Date.now()
    await product.save();
    log.end();
    return product;
};

//add product

const buildStore = async (model, context) => {
    const { name, description, masterPrice, productUrl, storeId, feature, size, color } = model;
    const log = context.logger.start(`services:products:buildProduct${model}`);
    const product = await new db.product({
        name: name,
        description: description,
        masterPrice: masterPrice,
        productUrl: productUrl,
        store: storeId,
        feature: feature,
        size: size,
        color: color
    }).save();
    log.end();
    return product;
};

const add = async (model, context) => {
    const log = context.logger.start("services:products:add");
    let product = await db.product.findOne({ name: model.name, description: model.description });
    if (product) {
        throw new Error("product already exists");
    }
    if (model.storeId) {
        throw new Error("store Id is required");
    }

    product = buildStore(model, context);
    log.end();
    return product;
};


const getProductById = async (id, context) => {
    const log = context.logger.start(`services:products:getProductById`);
    if (!id) {
        throw new Error("product id is required");
    }
    let product = await db.product.findById(id)
    if (!product) {
        throw new Error("product not found");
    }
    log.end();
    return product;
};
const getProducts = async (context) => {
    const log = context.logger.start(`services:products:getProducts`);
    let products = await db.product.find()
    // if (!product) {
    //     throw new Error("product not found");
    // }
    log.end();
    return products;
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:products:update`);
    let entity = await db.product.findById(id)
    if (!entity) {
        throw new Error("invalid product");
    }
    const product = await setProduct(model, entity, context);
    log.end();
    return product
};

const search = async (name, context) => {
    const log = context.logger.start(`services:products:search`);
    if (!name) {
        throw new Error("name is required");
    }
    const products = await db.product.find({ name: { "$regex": '.*' + name + '.*', "$options": 'i' } }).limit(5);
    return products
};

const imageUpload = async (id, type, files, context) => {
    const log = context.logger.start(`services:products:imageUpload`);
    if (!id) {
        throw new Error("product id is required");
    }
    let product = await db.product.findById(id)
    if (!product) {
        throw new Error("product not found");
    }
    if (type === 'gallery') {
        if (files == undefined && files.length < 0) throw new Error("image is required");
        for (const file of files) {
            let fileName = file.filename.replace(/ /g, '')
            product.gallery.push({ name: fileName })
        }
        await product.save()
    }
    else if (type === 'banner') {
        let fileName = files[0].filename.replace(/ /g, '')
        if (files == undefined && files.length < 0) throw new Error("image is required");
        if (product.logo != "") {
            const path = file.destination + '/' + product.banner
            try {
                fs.unlinkSync(path);
                console.log(`image successfully removed from ${path}`);
            } catch (error) {
                console.error('there was an error to remove image:', error.message);
            }
        }
        product.banner = fileName
        await product.save()

    }
    else {
        throw new Error("type is required");
    }
    log.end();
    return 'image uploaded successfully'
};

exports.add = add;
exports.search = search;
exports.getProductById = getProductById;
exports.getProducts = getProducts;
exports.update = update;
exports.imageUpload = imageUpload;