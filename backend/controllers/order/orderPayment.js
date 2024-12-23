const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: "YOUR_RAZORPAY_KEY_ID",
    key_secret: "YOUR_RAZORPAY_KEY_SECRET",
  });
  
  const createOrder= async (req, res) => {
    const { amount, currency } = req.body;
    try {
      const order = await razorpay.orders.create({ amount, currency });
      res.json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).send("Error creating order");
    }
  }
  
  const verifyPayment = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const crypto = require("crypto");
  
    const generated_signature = crypto
      .createHmac("sha256", "YOUR_RAZORPAY_KEY_SECRET")
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
  
    if (generated_signature === razorpay_signature) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  };
  
  module.exports={createOrder,verifyPayment}