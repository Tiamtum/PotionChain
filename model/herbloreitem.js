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
    }]
})

const deepPopulate = function(next){
    this.populate("requires");
    next();
}

herbloreItemSchema
    .pre("findOne",deepPopulate)
    .pre("find",deepPopulate);


module.exports = mongoose.model("HerbloreItem",herbloreItemSchema);