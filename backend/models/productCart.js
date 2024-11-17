const mongoose=require('mongoose')
 
const productCartSchema = new mongoose.Schema({
        productId: {
            ref:'products',
            type:String
        },
        quantity:Number,
        userId:String
       
},{
    timestamps:true
})

const productCartModel = mongoose.model("productCart",productCartSchema)
 
module.exports =productCartModel