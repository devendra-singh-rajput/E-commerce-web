const Order = require("../../models/orderModel");

async function getOrderHistory(req, res) {
  const userId = req.userId;
  // console.log("User ID received in API:", userId);

  try {
    // Fetch orders for the specified user ID
    const orders = await Order.find({ userId }).populate("orders.products.productId", "name price");

    // console.log("Orders found for user:", orders);
    // console.log("Orders found for user:", JSON.stringify(orders, null, 2));

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: "No order history found for this user." });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { getOrderHistory };
