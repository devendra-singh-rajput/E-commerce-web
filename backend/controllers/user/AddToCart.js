const productCartModel = require("../../models/productCart")

async function AddToCart(req,res){
    try {
       const {productId}=req?.body
       const currentUser= req.UserId

       const isproductAvailable =await productCartModel.findOne({productId})

        if (isproductAvailable) {
           return res.status(200).json({
                error:false,
                success:false,
                message:"Allready exits in Cart"
            })
        }       

       const payload={
        productId: productId,
        quantity:1,
        userId:currentUser
       }
     
        const newaddToCart  = new productCartModel(payload) 
        const seveProduct=  await newaddToCart.save()  


        res.status(200).json({
            data:seveProduct,
            error:false,
            success:true,
            message:"product added..!"
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message ||error,
            error: true,
            success: false,
          }); 
    }
}
module.exports=AddToCart