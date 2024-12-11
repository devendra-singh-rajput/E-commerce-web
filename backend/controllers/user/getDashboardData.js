// Import models
const User = require("../../models/UserModel");
const Product = require("../../models/ProductModel");
const Order = require("../../models/orderModel");

// Controller to fetch dashboard data
const getDashboardData = async (req, res) => {
  try {
    // Fetch total users
    const totalUsers = await User.countDocuments();

    // Fetch total products
    const totalProducts = await Product.countDocuments();

    // Fetch orders and calculate revenue
    const orders = await Order.find().populate("orders.products.productId").exec();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => {
      return (
        sum +
        order.orders.reduce((orderSum, subOrder) => orderSum + subOrder.totalAmount, 0)
      );
    }, 0);

    // Calculate pending orders
    const pendingOrders = orders.reduce((count, order) => {
      return (
        count +
        order.orders.filter((subOrder) => subOrder.status === "Pending").length
      );
    }, 0);

    // Group orders by status
    const orderStatus = orders.reduce((statusCounts, order) => {
      order.orders.forEach((subOrder) => {
        statusCounts[subOrder.status] = (statusCounts[subOrder.status] || 0) + 1;
      });
      return statusCounts;
    }, {});

    // Group sales by category
    const categorySales = await Product.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "orders.products.productId",
          as: "orderProducts",
        },
      },
      { $unwind: "$orderProducts" },
      { $unwind: "$orderProducts.orders" },
      { $unwind: "$orderProducts.orders.products" },
      {
        $group: {
          _id: "$category",
          totalRevenue: { $sum: "$orderProducts.orders.products.price" },
        },
      },
    ]);

    const formattedCategorySales = categorySales.reduce((obj, item) => {
      obj[item._id] = item.totalRevenue;
      return obj;
    }, {});

    // Revenue by day
    const orderData = await Order.aggregate([
      { $unwind: "$orders" },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$orders.createdAt" },
          },
          revenue: { $sum: "$orders.totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formattedOrderData = orderData.map((item) => ({
      date: item._id,
      revenue: item.revenue,
    }));

    // Send the response
    res.json({
      success: true,
      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        pendingOrders,
        orderStatus,
        categorySales: formattedCategorySales,
        orderData: formattedOrderData,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard data",
      error: error.message,
    });
  }
};

module.exports = { getDashboardData };
