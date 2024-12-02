const { default: mongoose } = require('mongoose');
const uploadProductPermission = require('../../helper/permission'); // Assuming this function handles permission check
const Order = require('../../models/orderModel'); 

// Get all orders
exports.getAllOrders = async (req, res) => {
  // Check if user has permission to upload products (might need to be adjusted based on your permission system)
  if (uploadProductPermission(req.userId)) {
    try {
      // Fetch all orders
      const orders = await Order.find(); 
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ success: false, message: 'Failed to retrieve orders', error: error.message });
    }
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};



// Update order details
exports.updateOrder = async (req, res) => {
  const { parentOrderId, orderId, ...updatedFields } = req.body;

  // Validate the incoming request
  if (!parentOrderId || !orderId || Object.keys(updatedFields).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Parent Order ID, Order ID, and at least one field to update are required",
    });
  }

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(parentOrderId) || !mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ success: false, message: "Invalid Order ID format" });
  }

  try {
    // Fetch the parent order document
    const parentOrder = await Order.findById(parentOrderId);

    if (!parentOrder) {
      return res.status(404).json({ success: false, message: "Parent order not found" });
    }

    // Find the specific nested order by `orderId`
    const nestedOrder = parentOrder.orders.id(orderId);

    if (!nestedOrder) {
      return res.status(404).json({ success: false, message: "Order not found within parent order" });
    }

    // Update the fields of the nested order
    Object.keys(updatedFields).forEach((key) => {
      nestedOrder[key] = updatedFields[key];
    });

    // Save the updated parent order document
    await parentOrder.save();

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: nestedOrder, // Return the updated nested order
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
};
