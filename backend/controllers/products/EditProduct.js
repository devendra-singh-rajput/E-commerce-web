const  uplaodProductPermission = require("../../helper/permission");
const productModel = require("../../models/ProductModel");

const updateProduct = async (req, res) => {

    try {
        const sessionId = req.userId;

        // Check permissions
        if (!(await uplaodProductPermission(sessionId))) {
            return res.status(403).json({
                message: 'Permission denied!',
                error: true,
                success: false,
            });
        }

        // Destructure _id and use it separately, exclude it from resBody
        const { _id, ...resBody } = req.body;
    
        // Validate _id presence
        if (!_id) {
            return res.status(400).json({
                message: 'Product ID is required!',
                error: true,
                success: false,
            });
        }

        // Update the product without trying to set _id in resBody
        const updatedProduct = await productModel.findByIdAndUpdate(_id, resBody, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                message: 'Product not found.',
                error: true,
                success: false,
            });
        }

        // Success response
        res.status(200).json({
            data: updatedProduct,
            error: false,
            success: true,
            message: 'Product updated successfully.',
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'An error occurred while updating the product.',
            error: true,
            success: false,
        });
    }
};
module.exports =updateProduct