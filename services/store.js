const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");
var nodemailer = require('nodemailer')
const fs = require('fs');

const setStore = async (model, store, context) => {
    const log = context.logger.start("services:stores:setStore");

    if (model.name !== "string" && model.name !== undefined) {
        store.name = model.name;
    }

    if (model.description !== "string" && model.description !== undefined) {
        store.description = model.description;
    }

    if (model.slogan !== "string" && model.slogan !== undefined) {
        store.slogan = model.slogan;
    }

    if (model.location !== "string" && model.location !== undefined) {
        store.location = model.location;
    }
    log.end();
    await store.save();
    return store;
};

//register store

const buildStore = async (model, context) => {
    const { name, description, slogan, location, priceRange, timing } = model;
    const log = context.logger.start(`services:stores:buildStore${model}`);
    const store = await new db.store({
        name: name,
        description: description,
        priceRange: priceRange,
        timing: timing,
        slogan: slogan,
        location: location
    }).save();
    log.end();
    return store;
};

const create = async (model, context) => {
    const log = context.logger.start("services:stores:create");
    let store = await db.store.findOne({ name: model.name, description: model.description, slogan: model.slogan });
    if (store) {
        throw new Error("store already exists");
    } else {
        store = buildStore(model, context);
        log.end();
        return store;
    }

};


const getStoreById = async (id, context) => {
    const log = context.logger.start(`services:stores:getStoreById`);
    if (!id) {
        throw new Error("store id is required");
    }
    let store = await db.store.findById(id)
    if (!store) {
        throw new Error("store not found");
    }
    log.end();
    return store;
};


const update = async (id, model, context) => {
    const log = context.logger.start(`services:stores:update`);
    let entity = await db.store.findById(id)
    if (!entity) {
        throw new Error("invalid store");
    }
    const store = await setStore(model, entity, context);
    log.end();
    return store
};

const search = async (name, context) => {
    const log = context.logger.start(`services:stores:search`);
    if (!name) {
        throw new Error("name is required");
    }
    const stores = await db.store.find({ name: { "$regex": '.*' + name + '.*', "$options": 'i' } }).limit(5);
    return stores
};

const imageUpload = async (id, type, files, context) => {
    const log = context.logger.start(`services:stores:imageUpload`);
    if (!id) {
        throw new Error("store id is required");
    }
    let store = await db.store.findById(id)
    if (!store) {
        throw new Error("store not found");
    }
    if (type === 'gallery') {
        if (files == undefined && files.length < 0) throw new Error("image is required");
        for (const file of files) {
            let fileName = file.filename.replace(/ /g, '')
            store.gallery.push({ name: fileName })
        }
        await store.save()
    }
    else if (type === 'logo') {
        let fileName = files[0].filename.replace(/ /g, '')
        if (files == undefined && files.length < 0) throw new Error("image is required");
        if (store.logo != "") {
            const path = file.destination + '/' + store.logo
            try {
                fs.unlinkSync(path);
                console.log(`image successfully removed from ${path}`);
            } catch (error) {
                console.error('there was an error to remove image:', error.message);
            }
        }
        store.logo = fileName
        await store.save()
    }
    else if (type === 'banner') {
        let fileName = files[0].filename.replace(/ /g, '')
        if (files == undefined && files.length < 0) throw new Error("image is required");
        if (store.logo != "") {
            const path = file.destination + '/' + store.banner
            try {
                fs.unlinkSync(path);
                console.log(`image successfully removed from ${path}`);
            } catch (error) {
                console.error('there was an error to remove image:', error.message);
            }
        }
        store.banner = fileName
        await store.save()

    }
    else {
        throw new Error("type is required");
    }
    log.end();
    return 'image uploaded successfully'
};
const buildFav = async (model, context) => {
    const { userId, storeId } = model;
    const log = context.logger.start(`services:stores:buildFav${model}`);
    const favourite = await new db.favourite({
        user: userId,
        store: storeId,
    }).save();
    log.end();
    return favourite;
};

const makeFavOrUnFav = async (model, context) => {
    const log = context.logger.start("services:stores:makeFavOrUnFav");

    if (model.userId == "" || model.storeId == "" || model.userId == undefined || model.storeId == undefined) {
        throw new Error('store id and user id is required')
    }
    let favourite = await db.favourite.findOne({ $and: [{ user: model.userId }, { store: model.storeId }] })
    if (favourite) {
        favourite = await db.favourite.deleteOne({ _id: favourite.id })
        if (favourite.deletedCount == 0) {
            throw new Error('something went wrong')
        }
        log.end();
        return 'unfav successfully';
    } else {
        favourite = await buildFav(model, context);
        log.end();
        return 'fav successfully';
    }

};
const getFavStores = async (id, context) => {
    const log = context.logger.start("services:stores:makeFavOrUnFav");
    if (!id) {
        throw new Error(' user id is required')
    }
    let favourites = await db.favourite.find({ user: id }).populate('store')
    log.end();
    return favourites;

};
const getAllStores = async (context) => {
    const log = context.logger.start(`services:stores:getAllStores`);
    const stores = await db.store.find();
    log.end();
    return stores;
};
exports.create = create;
exports.search = search;
exports.getStoreById = getStoreById;
exports.update = update;
exports.imageUpload = imageUpload;
exports.makeFavOrUnFav = makeFavOrUnFav;
exports.getFavStores = getFavStores;
exports.getAllStores = getAllStores;