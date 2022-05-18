const fs = require('fs');

const setStore = async (model, store, context) => {
    const log = context.logger.start("services:stores:setStore");

    if (model.name !== "string" && model.name !== undefined) {
        store.name = model.name;
    }
    if (model.description !== "string" && model.description !== undefined) {
        store.description = model.description;
    }
    if (model.address !== "string" && model.address !== undefined) {
        store.address = model.address;
    }
    if (model.storeType !== "string" && model.storeType !== undefined) {
        store.storeType = model.storeType;
    }
    if (model.slogan !== "string" && model.slogan !== undefined) {
        store.slogan = model.slogan;
    }
    if (model.priceRange.from !== "string" && model.priceRange.from !== undefined
        && model.priceRange.to !== "string" && model.priceRange.to !== undefined) {
        store.priceRange = model.priceRange;
    }
    if (model.location !== "string" && model.location !== undefined) {
        store.location = model.location;
    }
    if (model.scotNo !== "string" && model.scotNo !== undefined) {
        store.scotNo = model.scotNo;
    }
    if (model.timing.from !== "string" && model.timing.from !== undefined
        && model.timing.to !== "string" && model.timing.to !== undefined) {
        store.timing = model.timing;
    }
    if (model.zipCode !== "string" && model.zipCode !== undefined) {
        store.zipCode = model.zipCode;
    }
    if (model.contactNo !== "string" && model.contactNo !== undefined) {
        store.contactNo = model.contactNo;
    }
    if (model.webSiteUrl !== "string" && model.webSiteUrl !== undefined) {
        store.webSiteUrl = model.webSiteUrl;
    }
    if (model.deliveryCharges !== "string" && model.deliveryCharges !== undefined) {
        store.deliveryCharges = model.deliveryCharges;
    }
    if (model.isRecentlySearch) {
        store.recentSearch = Date.now()
    }
    log.end();
    await store.save();
    return store;
};

//register store

const buildStore = async (model, context) => {
    const { name, description, slogan, address, storeType, location, webSiteUrl, deliveryCharges, categoryId, zipCode, landmark, state, city, scotNo, priceRange, timing, userId, contactNo } = model;
    const log = context.logger.start(`services:stores:buildStore${model}`);
    const store = await new db.store({
        name: name,
        user: userId,
        description: description,
        priceRange: priceRange,
        category: categoryId,
        timing: timing,
        scotNo: scotNo,
        city: city,
        state: state,
        landmark: landmark,
        address: address,
        storeType: storeType,
        webSiteUrl: webSiteUrl,
        deliveryCharges: deliveryCharges,
        slogan: slogan,
        zipCode, zipCode,
        contactNo, contactNo,
        location: location
    }).save();
    log.end();
    return store;
};

const create = async (model, context) => {
    const log = context.logger.start("services:stores:create");

    let store = await db.store.findOne({ user: model.userId });
    if (store) {
        throw new Error("you have already a store");
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
    let store = await db.store.findById(id).populate('category')
    if (!store) {
        throw new Error("store not found");
    }
    log.end();
    return store;
};
const getStoreByCatId = async (id, context) => {
    const log = context.logger.start(`services:stores:getStoreByCatId`);
    if (!id) {
        throw new Error("category id is required");
    }
    let stores = await db.store.find({ category: id })
    if (!stores) {
        throw new Error("store not found");
    }
    log.end();
    return stores;
};

const myStores = async (id, context) => {
    const log = context.logger.start(`services:stores:myStores`);
    if (!id) {
        throw new Error("user id is required");
    }
    const stores = await db.store.find({ user: id })

    log.end();
    return stores;
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

const getRecentSearch = async (context) => {
    const log = context.logger.start(`services:stores:search`);
    const stores = await db.store.find({}).sort({ recentSearch: -1 }).limit(5)
    log.end()
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
            const path = files[0].destination + '/' + store.logo
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
            const path = files[0].destination + '/' + store.banner
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
    let favourite = await db.favourite.findOne({ user: model.userId, store: model.storeId })
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
    let favourites = await db.favourite.find({ user: id }).populate("store")
    log.end();
    return favourites;

};
const getAllStores = async (context) => {
    const log = context.logger.start(`services:stores:getAllStores`);
    let stores = await db.store.find();
    if (context?.user?.id) {
        const favourites = await db.favourite.find({ user: context.user.id }).populate('store')
        let storeList = []
        if (favourites.length > 0) {
            // add fav in store
            for (var s = 0; s < stores.length; s++) {
                let store = stores[s]
                for (var f = 0; f < favourites.length; f++) {
                    if (store.id == favourites[f].store.id) {
                        let isExist = await storeList.some((value) => value._id.toString() == store.id); //true
                        if (!isExist) {
                            storeList.push({ ...store._doc, isFav: true })
                        }
                    }

                }
                let isExist = await storeList.some((value) => value._id.toString() == store.id); //true
                if (!isExist) {
                    storeList.push({ ...store._doc, isFav: false })
                }
            }
            stores = storeList

        }
    }


    log.end();
    return stores;
};

exports.create = create;
exports.search = search;
exports.getRecentSearch = getRecentSearch;
exports.getStoreById = getStoreById;
exports.update = update;
exports.imageUpload = imageUpload;
exports.makeFavOrUnFav = makeFavOrUnFav;
exports.getFavStores = getFavStores;
exports.getAllStores = getAllStores;
exports.myStores = myStores;
exports.getStoreByCatId = getStoreByCatId;