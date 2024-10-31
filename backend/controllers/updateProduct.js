const uplaodProductPermission = require('../helper/permission')
const productModel =require ('../models/ProductModel')

async function updateProduct(req,res){
    try {
        const sessionId= req.userId
        if(!uplaodProductPermission(sessionId)){
           throw new Error('permission denied !')
        }
        const{_id, ...resBody}=req.body
          const updateProduct= await productModel.findByIdAndUpdate(_id,resBody)



            res.status(200).json({
                data:updateProduct,
                error:false,
                success:true,
                message:"Product updated.."
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message ||error,
            error: true,
            success: false,
          });
    }
}
module.exports=updateProduct