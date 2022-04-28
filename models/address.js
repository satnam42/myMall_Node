"use strict";
const mongoose = require("mongoose");
const address = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    fullName: { type: String, default: "" },
    area: { type: String, default: "" },
    buildingNo: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    state: { type: String, default: "" },
    pinCode: { type: String, default: "" },
    street: { type: String, default: "" },
    isDefault: { type: Boolean, default: false },
}, { timestamps: true }
);
mongoose.model("address", address);
module.exports = address;