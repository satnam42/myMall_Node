const mongoose = require('mongoose');
const product = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    banner: { type: String, default: "" },
    gallery: [{
        name: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now() }
    }],
    masterPrice: { type: Number, required: true },
    productUrl: { type: String },
    colors: [{
        name: { type: String },
        price: { type: String }
    }],
    size: [{
        value: { type: String },
        price: { type: String }
    }],
    feature: [{
        key: { type: String },
        value: { type: String }
    }],
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'store',
        required: true
    }
}, { timestamps: true })
mongoose.model('product', product)
module.exports = product;