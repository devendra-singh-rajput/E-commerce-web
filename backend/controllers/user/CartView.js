const productCartModel = require("../../models/productCart");
// const { populate } = require("../../models/ProductModel");

async function cartView(req,res){
    try {
       const currentUser= req.UserId

       const Allproducts =await productCartModel.find({UserId:currentUser}).populate('productId')

        res.status(200).json({
            data:Allproducts,
            error:false,
            success:true,
            message:"OK"
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message ||error,
            error: true,
            success: false,
          }); 
    }
}
module.exports=cartView