require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
const createOrder = async (req, res) => {
  const { amount, currency } = req.body;

  try {
    // Validate input
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }
    if (!currency || typeof currency !== "string") {
      return res.status(400).json({ success: false, message: "Invalid currency" });
    }

    // Create Razorpay Order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert amount to paise
      currency,
    });

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.response ? error.response.data : error.message,
    });
  }
};

// Verify Payment
const verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying payment",
      error: error.message,
    });
  }
};

module.exports = { createOrder, verifyPayment };
