const Order = require('../../models/orderModel');
const productModel = require('../../models/ProductModel');
const userModel = require('../../models/UserModel');

const placeOrder = async (req, res) => {
  const { productId, quantity, productImage,productName,shippingCharge,paymentStatus, tax, price, totalAmount, userData, otp, paymentMethod } = req.body;
  const userId = req.userId;

  try {
    // Validate OTP here if needed

    // Check if product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Create a new order entry for the user's orders array
    const newOrder = {
      products: [
        {
          productId: productId,
          quantity: quantity,
          price: price,
          productName:productName,
          productImage:productImage,
        }
      ],
      totalAmount: totalAmount,
      deliveryOption: paymentMethod,
      userDetail: userData,
      status: "Pending",
      paymentStatus: paymentStatus,
      shippingCharge:shippingCharge
    };

    // Check if an order document already exists for the user
    let userOrder = await Order.findOne({ userId });

    if (userOrder) {
      // If an order document exists, push the new order to the orders array
      userOrder.orders.push(newOrder);
    } else {
      // If no order document exists, create a new one
      userOrder = new Order({
        userId: userId,
        orders: [newOrder],
      });
    }

    // Save the updated order document
    await userOrder.save();
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          "userDetail.name": userData.name,
          "userDetail.pincode": userData.pincode,
          "userDetail.landmark": userData.landmark,
          "userDetail.address": userData.address,
          "userDetail.city": userData.city,
          "userDetail.state": userData.state,
          "userDetail.phoneNumber": userData.phoneNumber,
          "userDetail.alternatePhoneNumber": userData.alternatePhoneNumber,
        },
      },
      { new: true } // Option to return the updated document
    );

    return res.status(200).json({
      success: true,
      message: 'Order placed successfully',
      orderId: userOrder._id,
    });
    

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to place the order' });
  }
};

module.exports = {
  placeOrder,
};
