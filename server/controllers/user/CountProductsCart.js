const productCartModel = require("../../models/productCart");

async function countProductsInCart(req, res) {
    try {
        const currentUser = req.userId;
        // Fetch the user's cart
        const cart = await productCartModel.findOne({ userId: currentUser });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                error: true,
                success: false,
            });
        }

        // Count the distinct number of products in the cart
        const totalProductCount = cart.items.length;
        res.status(200).json({
            data: totalProductCount,
            error: false,
            success: true,
            message: "Total distinct products in cart",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "An error occurred while counting products in the cart.",
            error: true,
            success: false,
        });
    }
}

module.exports = countProductsInCart;
