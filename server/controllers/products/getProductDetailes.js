const productModel = require("../../models/ProductModel");

const getProductDetailes = async (req, res) => {
    try {
        const {productId}=req.body
        const allProductDetailes = await productModel.findById(productId)
        res.status(200).json({
            data: allProductDetailes,
            error: false,
            success: true,
            message: "All products detailes retrieved successfully."
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = getProductDetailes;
