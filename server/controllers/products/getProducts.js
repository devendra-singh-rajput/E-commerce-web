const productModel = require("../../models/ProductModel");

const getProducts = async (req, res) => {
    try {
        const allProducts = await productModel.find().sort({createdAt: -1 }); 

        res.status(200).json({
            data: allProducts,
            error: false,
            success: true,
            message: "All products retrieved successfully."
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = getProducts;
