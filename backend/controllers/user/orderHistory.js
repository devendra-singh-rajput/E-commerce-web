async function getOrderHistory(req, res) {
    try {
      const userId = req.userId; // Assume userId is attached in middleware
  
      const orders = await Order.find({ userId }).populate('products.productId');
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  
  module.exports = { getOrderHistory };
  