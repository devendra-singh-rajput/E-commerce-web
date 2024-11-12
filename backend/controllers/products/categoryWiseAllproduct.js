const productModel = require("../../models/ProductModel");

const productCategoryWise= async (req,res) => {
    try {
              const {category}=req.body
             const product = await productModel.find({category})
         res.status(200).json({
            data:product,
            error:false,
            success:true,
            message:"Success to find All  category Wise product"
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message ||error,
            error: true,
            success: false,
          });   
    }
}
module.exports=productCategoryWise