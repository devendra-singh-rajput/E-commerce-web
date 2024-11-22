const productCartModel = require("../../models/productCart");

async function updateCart(req, res) {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    // Validation
    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required.",
        error: true,
        success: false,
      });
    }
    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({
        message: "Quantity should be a positive number.",
        error: true,
        success: false,
      });
    }

    // Fetch the user's cart
    const cart = await productCartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found for this user.",
        error: true,
        success: false,
      });
    }

    // Locate the product in the cart
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Product not found in cart.",
        error: true,
        success: false,
      });
    }

    // Update quantity and save the cart
    cart.items[itemIndex].quantity = quantity;
    const updatedCart = await cart.save();

    res.status(200).json({
      data: updatedCart,
      error: false,
      success: true,
      message: "Quantity updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while updating the cart.",
      error: true,
      success: false,
    });
  }
}

module.exports = updateCart;
