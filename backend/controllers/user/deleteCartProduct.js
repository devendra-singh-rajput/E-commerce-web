const productCartModel = require("../../models/productCart")

async function deleteCartProduct(req,res){
    try {
       const {_id}=req?.body
       const currentUser= req.UserId

       const isproductAvailable =await productCartModel.deleteOne({_id})

        
           return res.status(200).json({
                error:false,
                success:true,
                message:"Product  delete from Cart"
          
           })       

      
    } catch (error) {
        return res.status(400).json({
            message: error.message ||error,
            error: true,
            success: false,
          }); 
    }
}
module.exports=deleteCartProduct