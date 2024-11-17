const productCartModel = require("../../models/productCart");

async function updateCart(req, res) {
  try {
    const currentUser = req.UserId;
    const cartProduct = req.body._id;
    const qty = req.body.quantity; // Ensure this matches the frontend key

    // Check if `qty` is provided
    if (typeof qty !== 'number') {
      return res.status(400).json({
        message: "Quantity is required and should be a number.",
        error: true,
        success: false,
      });
    }

    // Perform the update
    const updateProduct = await productCartModel.updateOne(
      { userId: currentUser, _id: cartProduct }, // Filter by user and product ID
      { $set: { quantity: qty } } // Update the quantity field
    );

    if (updateProduct.matchedCount === 0) {
      return res.status(404).json({
        message: "Product not found in cart.",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      data: updateProduct,
      error: false,
      success: true,
      message: "Quantity Updated",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = updateCart;
