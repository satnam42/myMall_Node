"use strict";
const mongoose = require("mongoose");
const cart = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'store',
        required: true
    },
    quantity: { type: Number, required: true },
    // tax: { type: Number, default: 10 },
    total: { type: Number, required: true },
    // variation: { type: String, required: true },
    status: {
        type: String, default: "Cart",
        enum: ["Cart", "Ordered", "Delivered"]
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("cart", cart);
module.exports = cart;