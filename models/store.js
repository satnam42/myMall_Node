const mongoose = require('mongoose')

const store = mongoose.Schema({
    name: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    description: { type: String, required: true },
    location: {
        type: { type: String },
        coordinates: [Number],
    },
    priceRange: {
        from: { type: Number, default: 0 },
        to: { type: Number, default: 0 },
    },
    timing: {
        from: { type: String, default: '' },
        to: { type: String, default: '' },
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    slogan: { type: String, default: "" },

    logo: { type: String, default: "" },
    banner: { type: String, default: "" },
    webSiteUrl: { type: String, default: "" },
    deliveryChangers: { type: String, default: "" },
    gallery: [{
        name: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now() }
    }],
    recentSearch: { type: Date },
    address: { type: String, default: "" },
    storeType: { type: String, default: "" },
    scotNo: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    landmark: { type: String, default: "" },
    contactNo: { type: String, default: "" },
    zipCode: { type: String, default: "" },
}, { timestamps: true })
mongoose.model('store', store)
module.exports = store;