const imageUrl = require('config').get('image').url
const path = require("path");
"use strict";

const createCategory = async (files, body, context) => {
    const log = context.logger.start("services:categories:createCategory");
    if (!files) {
        throw new Error("image not found");
    }
    const fileRes = files[0].filename
    let categoryModel = {}
    categoryModel.image = fileRes
    categoryModel.name = body.name
    const catRes = await new db.category(categoryModel).save();
    catRes.save();
    log.end();
    return catRes;
};

const getCategories = async (context) => {
    const log = context.logger.start(`services:categories:allCategories`);
    const categories = await db.category.find();
    log.end();
    return categories;

};



exports.createCategory = createCategory;
exports.getCategories = getCategories;