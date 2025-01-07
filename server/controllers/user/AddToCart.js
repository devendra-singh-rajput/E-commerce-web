const productCartModel = require("../../models/productCart");

async function AddToCart(req, res) {
    try {
        const { productId, quantity } = req.body;
        const userId = req.userId;

        // Find the user's cart, or create a new one if it doesn't exist
        let cart = await productCartModel.findOne({ userId });
        if (!cart) {
            cart = new productCartModel({ userId, items: [] });
        }

        // Check if the product already exists in the cart
        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        
        if (itemIndex > -1) {
            // If the item already exists, return an error message
            return res.status(200).json({
                error: false,
                success: false,
                message: "Product Already exists in cart!"
            });
        } else {
            // If the item doesn't exist, add it to the cart
            cart.items.push({ productId, quantity });
            const savedCart = await cart.save();

            return res.status(200).json({
                data: savedCart,
                error: false,
                success: true,
                message: "Product added to cart!"
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Error adding product to cart",
            error: true,
            success: false,
        });
    }
}

module.exports = AddToCart;
