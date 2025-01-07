async function getTopSellingProducts(req, res) {
    try {
      const topProducts = await Order.aggregate([
        { $unwind: '$products' },
        { $group: { _id: '$products.productId', totalSold: { $sum: '$products.quantity' } } },
        { $sort: { totalSold: -1 } },
        { $limit: 1 }
      ]);
  
      res.status(200).json({ success: true, data: topProducts });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  
  module.exports = { getTopSellingProducts };
  