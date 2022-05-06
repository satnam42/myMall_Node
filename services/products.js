const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");
const fs = require('fs');
const { size, constant } = require("lodash");

const setProduct = async (model, product, context) => {
    const log = context.logger.start("services:products:setStore");

    if (model.name !== "string" && model.name !== undefined) {
        product.name = model.name;
    }

    if (model.description !== "string" && model.description !== undefined) {
        product.description = model.description;
    }
    if (model.brand !== "string" && model.brand !== undefined) {
        product.brand = model.brand;
    }

    if (model.productUrl !== "string" && model.productUrl !== undefined) {
        product.productUrl = model.productUrl;
    }

    if (model.discount !== "string" && model.discount !== undefined) {
        product.discount = model.discount;
    }

    if (model.feature.length > 0) {
        product.feature = model.feature;
    }
    if (model.isOnDiscount == true || model.isOnDiscount == false) {
        product.isOnDiscount = model.isOnDiscount;
    }

    if (model.size.length > 0) {
        product.size = model.size;
    }

    if (model.colors.length > 0) {
        product.colors = model.colors;
    }

    product.updatedAt = Date.now()
    await product.save();
    log.end();
    return product;
};

//add product

const buildStore = async (model, context) => {
    const { name, description, masterPrice, brand, isOnDiscount, categoryId, productUrl, discount, storeId, feature, size, colors } = model;
    const log = context.logger.start(`services:products:buildProduct${model}`);
    const product = await new db.product({
        name: name,
        description: description,
        masterPrice: masterPrice,
        productUrl: productUrl,
        store: storeId,
        feature: feature,
        isOnDiscount: isOnDiscount,
        brand: brand,
        category: categoryId,
        discount: discount,
        size: size,
        colors: colors
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
    if (!model.storeId) {
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
const getSimilarProduct = async (categoryId, context) => {
    const log = context.logger.start(`services:products:getSimilarProduct`);
    if (!categoryId) {
        throw new Error("categoryId  is required");
    }
    let product = await db.product.find({ category: categoryId })
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
        if (product.banner != "") {
            const path = files[0].destination + '/' + product.banner
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
const buildFav = async (model, context) => {
    const { userId, productId } = model;
    const log = context.logger.start(`services:products:buildFav${model}`);
    const favourite = await new db.favourite({
        user: userId,
        product: productId,
    }).save();
    log.end();
    return favourite;
};

const makeFavOrUnFav = async (model, context) => {
    const log = context.logger.start("services:products:makeFavOrUnFav");

    if (model.userId == "" || model.productId == "" || model.userId == undefined || model.productId == undefined) {
        throw new Error('product id and user id is required')
    }
    let favourite = await db.favourite.findOne({ $and: [{ user: model.userId }, { product: model.productId }] })
    if (favourite) {
        favourite = await db.favourite.deleteOne({ _id: favourite.id })
        if (favourite.deletedCount == 0) {
            throw new Error('something went wrong')
        }
        log.end();
        return 'unfav successfully';
    } else {
        favourite = buildFav(model, context);
        log.end();
        return 'fav successfully';
    }

};
const dealOfTheDay = async (context) => {
    const log = context.logger.start(`services:products:dealOfTheDay`);
    let date = new Date();
    let products = await db.product.find({
        isOnDiscount: true, updatedAt: {
            $gte: date,
            $lte: moment(date).endOf('day')
        }
    }).populate('store')

    log.end()
    return products

}

const getFavProducts = async (id, context) => {
    const log = context.logger.start("services:products:makeFavOrUnFav");
    if (!id) {
        throw new Error(' user id is required')
    }
    let favourites = await db.favourite.find({ user: id }).populate('product')
    log.end();
    return favourites;

};
const getProductByStoreId = async (id, context) => {
    const log = context.logger.start("services:products:getProductByStoreId");
    if (!id) {
        throw new Error(' store id is required')
    }
    let products = await db.product.find({ store: id }).populate('store')
    log.end();
    return products;

};
const ratingReview = async (model, context) => {
    const log = context.logger.start("services:products:ratingReview");
    if (!model.productId) {
        throw new Error(' productId  is required')
    }
    const filter = {
        _id: model.productId,
        "rating.userId": { $eq: model.userId }
    }

    let ratingReview = await db.product.findOne(filter)

    if (ratingReview != null || ratingReview != undefined) {

        const update = {
            $pull: { rating: { userId: model.userId, } }
        }
        ratingReview = await db.product.findOneAndUpdate(filter, update)

        // const updated = {
        //     $push: { rating: { userId: model.userId, rating: model.rating, customerName: model.customerName, review: model.review } }
        // }
        // ratingReview = await db.product.findOneAndUpdate(filter, updated)



    }
    const query = {
        _id: model.productId,
    }
    const updated = {
        $push: { rating: { userId: model.userId, rating: model.rating, customerName: model.customerName, review: model.review } }
    }
    ratingReview = await db.product.findOneAndUpdate(query, updated)


    return ratingReview;

};

exports.add = add;
exports.search = search;
exports.getProductById = getProductById;
exports.getProducts = getProducts;
exports.update = update;
exports.imageUpload = imageUpload;
exports.makeFavOrUnFav = makeFavOrUnFav;
exports.getFavProducts = getFavProducts;
exports.getProductByStoreId = getProductByStoreId;
exports.ratingReview = ratingReview;
exports.getSimilarProduct = getSimilarProduct;
exports.dealOfTheDay = dealOfTheDay;