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
    const { name, description, slogan, location } = model;
    const log = context.logger.start(`services:stores:buildStore${model}`);
    const store = await new db.store({
        name: name,
        description: description,
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



// const imageUpload = async (id, files, context) => {
//     const log = context.logger.start(`services:stores:imageUpload`);
//     let fileName = files[0].filename.replace(/ /g, '')
//     let file = files[0]
//     if (!id) {
//         throw new Error("store id is required");
//     }
//     let store = await db.store.findById(id)
//     if (!store) {
//         throw new Error("store not found");
//     }
//     if (files == undefined && files.length < 0) throw new Error("image is required");
//     if (store.profileImageName != "") {
//         const path = file.destination + '/' + store.profileImageName
//         try {
//             fs.unlinkSync(path);
//             console.log(`image successfully removed from ${path}`);
//         } catch (error) {
//             console.error('there was an error to remove image:', error.message);
//         }
//     }
//     store.profileImageName = fileName
//     await store.save()
//     log.end();
//     return 'image uploaded successfully'
// };

exports.create = create;
exports.search = search;
exports.getStoreById = getStoreById;
exports.update = update;