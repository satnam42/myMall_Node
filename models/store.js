const mongoose = require('mongoose')

const store = mongoose.Schema({
    name: { type: String, required: true },
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
        from: { type: Date, default: '' },
        to: { type: Date, default: '' },
    },
    slogan: { type: String, default: "" },
    logo: { type: String, default: "" },
    banner: { type: String, default: "" },
    webSiteUrl: { type: String, default: "" },
    gallery: [{
        name: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now() }
    }]
}, { timestamps: true })
mongoose.model('store', store)
module.exports = store;