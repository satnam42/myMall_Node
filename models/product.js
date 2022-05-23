const mongoose = require('mongoose');
const product = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    banner: { type: String, default: "" },
    gallery: [{
        name: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now() }
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    masterPrice: { type: Number, required: true },
    discount: { type: String },
    isOnDiscount: { type: Boolean, default: false },
    brand: { type: String, default: "" },
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
    rating: [{
        rating: {
            type: Number,
            // required: [true, 'A rating is required.'],
            min: [1, 'A minimum rating of "1" is required.'],
            max: [5, '"5" is the maximum rating.']
        },
        review: { type: String, default: "", },
        postedOn: { type: Date, default: Date.now },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',

        },
        customerName: { type: String }
    }],
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'store',
        required: true
    },
    offerTime: { type: Date }
}, { timestamps: true })
mongoose.model('product', product)
module.exports = product;