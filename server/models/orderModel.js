const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      productImage:{ type: String, },
      productName:{ type: String,},
      brandName: { type: String,},
    },
  ],
  totalAmount: { type: Number, required: true },
  shippingCharge:{ type: Number },
  status: {
    type: String,
    default: "Pending",
    // enum: ["Pending", "Shipped","Delivered","Cancel"],
  },
  paymentStatus: {
    type: String,
    default: "Unpaid",
    // enum: ["Unpaid", "Paid", "Failed"],
  },
  deliveryOption: {
    type: String,
    enum: ["COD", "Card", "UPI", "NetBanking"],
    required: true,
  },
  expectedDelivery:String,
  userDetail: {
    name: { type: String, required: true },
    pincode: { type: Number, required: true, min: 100000, max: 999999 },
    landmark: String,
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    phoneNumber: { type: Number, match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] },
    alternatePhoneNumber: { type: Number, match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] },
  },
  createdAt: { type: Date, default: Date.now },
})

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orders:[ordersSchema],
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
