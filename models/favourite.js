"use strict";
const mongoose = require("mongoose");
const favourite = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'store',
    },
},
    { timestamps: true } //to include createdAt and updatedAt
);

mongoose.model("favourite", favourite);
module.exports = favourite;