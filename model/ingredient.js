const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    itemID:{
        type: Number,
        required: true 
    },
    requires:[this]
})

module.exports = mongoose.model("Ingredient",ingredientSchema);