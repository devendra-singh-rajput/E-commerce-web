async function getRevenueStats(req, res) {
    try {
      const dailyRevenue = await Order.aggregate([
        { $group: { _id: { day: { $dayOfMonth: '$createdAt' }, month: { $month: '$createdAt' } }, total: { $sum: '$totalAmount' } } },
        { $sort: { '_id.day': 1 } }
      ]);
  
      const monthlyRevenue = await Order.aggregate([
        { $group: { _id: { month: { $month: '$createdAt' } }, total: { $sum: '$totalAmount' } } },
        { $sort: { '_id.month': 1 } }
      ]);
  
      res.status(200).json({ success: true, dailyRevenue, monthlyRevenue });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  
  module.exports = { getRevenueStats };
  