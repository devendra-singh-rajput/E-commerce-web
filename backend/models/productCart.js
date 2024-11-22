const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  items: [CartItemSchema],
});

const productCartModel  =mongoose.model('Cart', CartSchema);
module.exports =productCartModel




// const mongoose=require('mongoose')
 
// const productCartSchema = new mongoose.Schema({
//         productId: {
//             ref:'products',
//             type:String
//         },
//         quantity:Number,
//         userId:String
       
// },{
//     timestamps:true
// })

// const productCartModel = mongoose.model("productCart",productCartSchema)
 
// module.exports =productCartModel