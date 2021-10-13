const mongoose = require("mongoose");

const herbloreItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    itemID:{
        type: Number,
        required: true
    },
    requires:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "HerbloreItem"
    }],
    image:{
        type: String,
        required: true
    },
    dailyPrice:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("HerbloreItem",herbloreItemSchema);