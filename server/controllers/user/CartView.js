const productCartModel = require("../../models/productCart");

async function cartView(req, res) {
    try {
        const userId = req.userId;

        // Find the cart for the current user and populate product details
        const cart = await productCartModel.findOne({ userId }).populate('items.productId');

        if (!cart) {
            return res.status(404).json({
                data: null,
                error: false,
                success: false,
                message: "No cart found for this user"
            });
        }
        res.status(200).json({
            data: cart,
            error: false,
            success: true,
            message: "Cart retrieved successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "An error occurred while retrieving the cart",
            error: true,
            success: false,
        });
    }
}

module.exports = cartView;
