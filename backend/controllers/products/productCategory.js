const productModel = require("../../models/ProductModel");

const productCategory= async (req,res) => {

    //findin all product category and his frist product
    try {
         const productCategory= await productModel.distinct("category")
         const productByCategory=[]
         for(const category of productCategory){
             const product = await productModel.findOne({category})
             if(product){
                productByCategory.push(product)
             }
         }


         res.status(200).json({
            data:productByCategory,
            error:false,
            success:true,
            message:"Success to find category"
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message ||error,
            error: true,
            success: false,
          });   
    }
}
module.exports=productCategory