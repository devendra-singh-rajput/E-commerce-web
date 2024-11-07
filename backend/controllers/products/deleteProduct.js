const productModel = require("../../models/ProductModel");

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
       
        if (!id) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Product ID is required.",
            });
        }
       console.log(id)
        // Attempt to delete the product by ID
        const deletedProduct = await productModel.deleteOne({ _id: id });

        // Check if the product was actually found and deleted
        if (!deletedProduct.deletedCount) {
            return res.status(404).json({
                error: true,
                success: false,
                message: "Product not found.",
            });
        }

        // Successfully deleted the product
        res.status(200).json({
            error: false,
            success: true,
            message: "Product deleted...",
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = deleteProduct;
