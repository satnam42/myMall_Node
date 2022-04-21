"use strict";
const mongoose = require("mongoose");
const category = mongoose.Schema({
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});
mongoose.model("category", category);
module.exports = category;