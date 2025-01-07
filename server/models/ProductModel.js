const mongoose=require('mongoose')
 
const productSchema = new mongoose.Schema({
        productName: String,
        brandName: String,
        category:String,
        productImage: [],
        description: String,
        price: Number,
        sellingPrice: Number,
},{
    timestamps:true
})

const productModel = mongoose.model("products",productSchema)
 
module.exports =productModel