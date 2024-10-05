const mongoose = require("mongoose")
const schemaProduct = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    prise:{
        type:String,
        required:true,
    },
    image:{
        type:File,
        required:true,
    }
},{timestamps:true})
const Product = mongoose.model("Product", schemaProduct)
module.exports = Product;