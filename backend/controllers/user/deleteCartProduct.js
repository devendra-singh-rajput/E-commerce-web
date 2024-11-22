const productCartModel = require("../../models/productCart");

async function deleteCartProduct(req, res) {
  try {
    const { productId } = req.body; // Product ID to delete
    const userId = req.userId; // User ID from the authenticated request

    // Check if `productId` is provided
    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required.",
        error: true,
        success: false,
      });
    }

    // Find the user's cart
    const cart = await productCartModel.findOne({ userId });

    // If the cart doesn't exist, return an error
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found for this user.",
        error: true,
        success: false,
      });
    }

    // Find the index of the product in the cart's items
    const productIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({
        message: "Product not found in cart.",
        error: true,
        success: false,
      });
    }

    // Remove the product from the cart
    cart.items.splice(productIndex, 1);

    // Save the updated cart
    const updatedCart = await cart.save();

    return res.status(200).json({
      message: "Product deleted from cart.",
      data: updatedCart,
      error: false,
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occurred while deleting the product from the cart.",
      error: true,
      success: false,
    });
  }
}

module.exports = deleteCartProduct;
