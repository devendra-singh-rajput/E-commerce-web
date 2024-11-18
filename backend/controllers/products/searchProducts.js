const productModel = require("../../models/ProductModel");

const searchProducts = async (req, res) => {
    try {
        const query =req.query.q
        const regex =new RegExp(query,'i','g')
        const searchAllProduct = await productModel.find({
            "$or":[
                {productName: regex},
                {brandName: regex},
               { category:regex},
            ]
        })
        res.status(200).json({
            data: searchAllProduct,
            error: false,
            success: true,
            message: "All products  search successfully."
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = searchProducts;
