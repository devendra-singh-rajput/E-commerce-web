const productCartModel = require("../../models/productCart")

async function countProductCart(req,res){
    try {
       const currentUser= req.UserId

       const count =await productCartModel.countDocuments({currentUser})

        res.status(200).json({
            data:count,
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
module.exports=countProductCart