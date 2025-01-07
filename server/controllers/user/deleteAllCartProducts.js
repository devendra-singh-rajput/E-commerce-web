const productCartModel = require("../../models/productCart");
// Controller to delete all products in a cart
const deleteAllCartItems = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a URL parameter
    const cart = await productCartModel.findOneAndUpdate(
      { userId },
      { $set: { items: [] } }, // Set items array to empty
      { new: true } // Return the updated document
    );

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user.' });
    }

    return res.status(200).json({ message: 'All items removed from cart.', cart });
  } catch (error) {
    console.error('Error deleting cart items:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

module.exports = {
  deleteAllCartItems,
};
