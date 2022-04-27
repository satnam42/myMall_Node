"use strict";
const user = require('../models/user');
const imageUrl = require('config').get('image').url

exports.toModel = entity => {
    const model = {
        id: entity._id,
        name: entity.name,
        description: entity.description,
        masterPrice: entity.masterPrice,
        productUrl: entity.productUrl,
        banner: entity.banner ? `${imageUrl}${entity.banner}` : "",
        colors: entity.colors,
        size: entity.size,
        feature: entity.feature,
        discount: entity.discount,
        brand: entity.brand,
        store: entity.store,
        rating: entity.rating,
    };
    if (entity.gallery && entity.gallery.length > 0) {
        for (let index = 0; index < entity.gallery.length; index++) {
            entity.gallery[index].name = `${imageUrl}${entity.gallery[index].name}`;
        }
        model.gallery = entity.gallery
    }
    return model;

};


exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
};