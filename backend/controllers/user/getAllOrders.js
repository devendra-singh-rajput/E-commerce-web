async function getAllOrders(req, res) {
    try {
      const orders = await Order.find().populate('products.productId');
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  
  module.exports = { getAllOrders };
  