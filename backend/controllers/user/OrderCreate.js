// controllers/orderController.js
const Order = require('../models/Order');
const sendOtp = require('../services/otpService'); // Assume this handles OTP sending
const verifyOtp = require('../services/otpService').verifyOtp; // Assume this handles OTP verification

async function placeOrder(req, res) {
  try {
    const { userId, products, totalAmount, otp, phoneNumber } = req.body;
    
    // Verify OTP
    const otpVerified = await verifyOtp(phoneNumber, otp);
    if (!otpVerified) {
      return res.status(400).json({ success: false, message: 'OTP verification failed' });
    }

    // Create Order
    const newOrder = new Order({
      userId,
      products,
      totalAmount,
      status: 'Pending'
    });
    
    await newOrder.save();
    res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { placeOrder };
