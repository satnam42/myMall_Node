"use strict";
const user = require('../models/user');
const imageUrl = require('config').get('image').url

exports.toModel = entity => {
    if (entity.friendId) {
        entity = entity.friendId
    }
    const model = {
        id: entity._id,
        name: entity.name,
        email: entity.email,
        password: entity.password,
        sex: entity.sex,
        description: entity.description,
        profileImageName: entity.profileImageName ? `${imageUrl}${entity.profileImageName}` : "",
        phoneNo: entity.phoneNo,
        dob: entity.dob,
        school: entity.school,
        aboutMe: entity.aboutMe,
        livingIn: entity.livingIn,
        myWork: entity.myWork,
        height: entity.height,
        weight: entity.weight,
        favSports: entity.favSports,
        degreeOfEduction: entity.degreeOfEduction,
        lookingFor: entity.lookingFor,
        sexualOrientation: entity.sexualOrientation,
        loc: entity.loc,
        status: entity.status,
    };
    if (entity.gallery && entity.gallery.length > 0) {
        for (let index = 0; index < entity.gallery.length; index++) {
            entity.gallery[index].image = `${imageUrl}${entity.gallery[index].image}`;
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